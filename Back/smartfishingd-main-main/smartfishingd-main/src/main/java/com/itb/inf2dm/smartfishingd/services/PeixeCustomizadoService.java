package com.itb.inf2dm.smartfishingd.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itb.inf2dm.smartfishingd.model.entity.PeixeCustomizado;
import com.itb.inf2dm.smartfishingd.repository.PeixeCustomizadoRepository;
import com.itb.inf2dm.smartfishingd.repository.UsuarioPesqueiroRepository;

@Service
public class PeixeCustomizadoService {

    private static final int LIMITE_PEIXES = 20;

    @Autowired
    private PeixeCustomizadoRepository peixeCustomizadoRepository;

    @Autowired
    private UsuarioPesqueiroRepository usuarioPesqueiroRepository;

    public List<PeixeCustomizado> listar(Long pesqueiroId) {
        return peixeCustomizadoRepository.findByPesqueiroId(pesqueiroId);
    }

    public PeixeCustomizado adicionar(Long pesqueiroId, String nome, String foto, String descricao, Long usuarioIdAutenticado, boolean isAdmin) {
        if (!isAdmin && !isDono(pesqueiroId, usuarioIdAutenticado)) {
            throw new SecurityException("Você só pode adicionar peixes no seu próprio pesqueiro");
        }
        if (nome == null || nome.trim().isEmpty()) {
            throw new IllegalArgumentException("O nome do peixe é obrigatório");
        }
        List<PeixeCustomizado> existentes = peixeCustomizadoRepository.findByPesqueiroId(pesqueiroId);
        if (existentes.size() >= LIMITE_PEIXES) {
            throw new IllegalStateException("Você atingiu o limite de " + LIMITE_PEIXES + " peixes personalizados por pesqueiro.");
        }
        boolean jaExiste = existentes.stream()
                .anyMatch(p -> p.getNome().trim().equalsIgnoreCase(nome.trim()));
        if (jaExiste) {
            throw new IllegalStateException("Você já tem um peixe com esse nome nesse pesqueiro.");
        }

        PeixeCustomizado peixe = new PeixeCustomizado();
        peixe.setPesqueiroId(pesqueiroId);
        peixe.setNome(nome.trim());
        peixe.setFoto(foto);
        peixe.setDescricao(descricao);
        return peixeCustomizadoRepository.save(peixe);
    }

    public PeixeCustomizado atualizar(Long peixeId, String nome, String foto, String descricao, Long usuarioIdAutenticado, boolean isAdmin) {
        PeixeCustomizado peixe = peixeCustomizadoRepository.findById(peixeId)
                .orElseThrow(() -> new RuntimeException("Peixe não encontrado com o id " + peixeId));
        if (!isAdmin && !isDono(peixe.getPesqueiroId(), usuarioIdAutenticado)) {
            throw new SecurityException("Você só pode editar peixes do seu próprio pesqueiro");
        }
        if (nome == null || nome.trim().isEmpty()) {
            throw new IllegalArgumentException("O nome do peixe é obrigatório");
        }
        boolean jaExiste = peixeCustomizadoRepository.findByPesqueiroId(peixe.getPesqueiroId()).stream()
                .anyMatch(p -> !p.getId().equals(peixeId) && p.getNome().trim().equalsIgnoreCase(nome.trim()));
        if (jaExiste) {
            throw new IllegalStateException("Você já tem um peixe com esse nome nesse pesqueiro.");
        }

        peixe.setNome(nome.trim());
        if (foto != null) {
            peixe.setFoto(foto);
        }
        peixe.setDescricao(descricao);
        return peixeCustomizadoRepository.save(peixe);
    }

    public void remover(Long peixeId, Long usuarioIdAutenticado, boolean isAdmin) {
        PeixeCustomizado peixe = peixeCustomizadoRepository.findById(peixeId)
                .orElseThrow(() -> new RuntimeException("Peixe não encontrado com o id " + peixeId));
        if (!isAdmin && !isDono(peixe.getPesqueiroId(), usuarioIdAutenticado)) {
            throw new SecurityException("Você só pode remover peixes do seu próprio pesqueiro");
        }
        peixeCustomizadoRepository.delete(peixe);
    }

    private boolean isDono(Long pesqueiroId, Long usuarioId) {
        return usuarioPesqueiroRepository.findByPesqueiroId(pesqueiroId)
                .map(vinculo -> vinculo.getusuarioId().equals(usuarioId))
                .orElse(false);
    }
}
