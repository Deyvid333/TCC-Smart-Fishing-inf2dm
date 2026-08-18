package com.itb.inf2dm.smartfishingd.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itb.inf2dm.smartfishingd.model.entity.Favorito;
import com.itb.inf2dm.smartfishingd.model.entity.Pesqueiro;
import com.itb.inf2dm.smartfishingd.repository.FavoritoRepository;
import com.itb.inf2dm.smartfishingd.repository.PesqueiroRepository;

@Service
public class FavoritoService {

    @Autowired
    private FavoritoRepository favoritoRepository;

    @Autowired
    private PesqueiroRepository pesqueiroRepository;

    public Favorito favoritar(Long usuarioId, Long pesqueiroId) {
        favoritoRepository.findByUsuarioIdAndPesqueiroId(usuarioId, pesqueiroId)
                .ifPresent(f -> {
                    throw new IllegalStateException("Pesqueiro já favoritado por esse usuário");
                });

        Favorito favorito = new Favorito();
        favorito.setUsuarioId(usuarioId);
        favorito.setPesqueiroId(pesqueiroId);
        favorito.setDataCadastro(LocalDate.now());
        return favoritoRepository.save(favorito);
    }

    public void desfavoritar(Long usuarioId, Long pesqueiroId) {
        Favorito favorito = favoritoRepository.findByUsuarioIdAndPesqueiroId(usuarioId, pesqueiroId)
                .orElseThrow(() -> new RuntimeException("Favorito não encontrado para esse usuário e pesqueiro"));
        favoritoRepository.delete(favorito);
    }

    public List<Pesqueiro> listarFavoritosPorUsuario(Long usuarioId) {
        return favoritoRepository.findByUsuarioId(usuarioId).stream()
                .map(favorito -> pesqueiroRepository.findById(favorito.getPesqueiroId()))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }
}
