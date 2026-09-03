package com.itb.inf2dm.smartfishingd.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itb.inf2dm.smartfishingd.model.entity.PesqueiroFoto;
import com.itb.inf2dm.smartfishingd.repository.PesqueiroFotoRepository;
import com.itb.inf2dm.smartfishingd.repository.UsuarioPesqueiroRepository;

@Service
public class PesqueiroFotoService {

    private static final int LIMITE_FOTOS = 5;

    @Autowired
    private PesqueiroFotoRepository pesqueiroFotoRepository;

    @Autowired
    private UsuarioPesqueiroRepository usuarioPesqueiroRepository;

    public List<PesqueiroFoto> listar(Long pesqueiroId) {
        return pesqueiroFotoRepository.findByPesqueiroIdOrderByOrdemAsc(pesqueiroId);
    }

    public PesqueiroFoto adicionar(Long pesqueiroId, String foto, Long usuarioIdAutenticado, boolean isAdmin) {
        if (!isAdmin && !isDono(pesqueiroId, usuarioIdAutenticado)) {
            throw new SecurityException("Você só pode adicionar fotos no seu próprio pesqueiro");
        }
        long quantidadeAtual = pesqueiroFotoRepository.countByPesqueiroId(pesqueiroId);
        if (quantidadeAtual >= LIMITE_FOTOS) {
            throw new IllegalStateException("Você atingiu o limite de " + LIMITE_FOTOS + " fotos por pesqueiro.");
        }

        PesqueiroFoto pesqueiroFoto = new PesqueiroFoto();
        pesqueiroFoto.setPesqueiroId(pesqueiroId);
        pesqueiroFoto.setFoto(foto);
        pesqueiroFoto.setOrdem((int) quantidadeAtual);
        return pesqueiroFotoRepository.save(pesqueiroFoto);
    }

    public void remover(Long fotoId, Long usuarioIdAutenticado, boolean isAdmin) {
        PesqueiroFoto foto = pesqueiroFotoRepository.findById(fotoId)
                .orElseThrow(() -> new RuntimeException("Foto não encontrada com o id " + fotoId));
        if (!isAdmin && !isDono(foto.getPesqueiroId(), usuarioIdAutenticado)) {
            throw new SecurityException("Você só pode remover fotos do seu próprio pesqueiro");
        }
        pesqueiroFotoRepository.delete(foto);
    }

    private boolean isDono(Long pesqueiroId, Long usuarioId) {
        return usuarioPesqueiroRepository.findByPesqueiroId(pesqueiroId)
                .map(vinculo -> vinculo.getusuarioId().equals(usuarioId))
                .orElse(false);
    }
}
