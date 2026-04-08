package com.itb.inf2dm.smartfishingd.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itb.inf2dm.smartfishingd.model.entity.UsuarioPesqueiro;
import com.itb.inf2dm.smartfishingd.repository.UsuarioPesqueiroRepository;

@Service
public class UsuarioPesqueiroService {
    @Autowired
    private UsuarioPesqueiroRepository usuarioPesqueiroRepository;

    public List<UsuarioPesqueiro> findAll() {
        return usuarioPesqueiroRepository.findAll();
    }

    public UsuarioPesqueiro save(UsuarioPesqueiro usuarioPesqueiro) {
        return usuarioPesqueiroRepository.save(usuarioPesqueiro);
    }

    public UsuarioPesqueiro update(Long id, UsuarioPesqueiro usuarioPesqueiro) {
        UsuarioPesqueiro usuarioPesqueiroExistente = findById(id);
        usuarioPesqueiroExistente.setusuarioId(usuarioPesqueiro.getusuarioId());
        usuarioPesqueiroExistente.setpesqueiroId(usuarioPesqueiro.getpesqueiroId());
        usuarioPesqueiroExistente.setId(id);
        return usuarioPesqueiroRepository.save(usuarioPesqueiroExistente);
    }

    public UsuarioPesqueiro findById(Long id) {
        return usuarioPesqueiroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("UsuarioPesqueiro nao encontrado com o id " + id));
    }

    public void delete(Long id) {
        UsuarioPesqueiro usuarioPesqueiroExistente = findById(id);
        usuarioPesqueiroRepository.delete(usuarioPesqueiroExistente);
    }
}
