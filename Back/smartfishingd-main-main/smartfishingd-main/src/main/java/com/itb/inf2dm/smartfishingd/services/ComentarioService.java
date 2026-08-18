package com.itb.inf2dm.smartfishingd.services;

import com.itb.inf2dm.smartfishingd.model.entity.Comentario;
import com.itb.inf2dm.smartfishingd.repository.ComentarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComentarioService {

    @Autowired
    private ComentarioRepository comentarioRepository;

    public List<Comentario> findAll() {
        return comentarioRepository.findAll();
    }

    public Comentario save(Comentario comentario, Long usuarioIdAutenticado) {
        comentario.setUsuarioId(usuarioIdAutenticado);
        return comentarioRepository.save(comentario);
    }

    public Comentario update(Long id, Comentario comentario, Long usuarioIdAutenticado) {
        Comentario comentarioExistente = findById(id);
        if (!comentarioExistente.getUsuarioId().equals(usuarioIdAutenticado)) {
            throw new SecurityException("Você só pode editar o seu próprio comentário");
        }
        comentarioExistente.setDescricao(comentario.getDescricao());
        comentarioExistente.setPesqueiroId(comentario.getPesqueiroId());
        comentarioExistente.setDataCadastro(comentario.getDataCadastro());
        comentarioExistente.setNota(comentario.getNota());
        comentarioExistente.setId(id);
        return comentarioRepository.save(comentarioExistente);
    }

    public Comentario findById(Long id) {
        return comentarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comentario nao encontrado com o id " + id));
    }

    public void delete(Long id, Long usuarioIdAutenticado, boolean isAdmin) {
        Comentario comentarioExistente = findById(id);
        if (!isAdmin && !comentarioExistente.getUsuarioId().equals(usuarioIdAutenticado)) {
            throw new SecurityException("Você só pode apagar o seu próprio comentário");
        }
        comentarioRepository.delete(comentarioExistente);
    }
}