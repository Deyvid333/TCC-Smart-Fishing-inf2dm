package com.itb.inf2dm.smartfishingd.services;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itb.inf2dm.smartfishingd.model.entity.Comentario;
import com.itb.inf2dm.smartfishingd.model.entity.Denuncia;
import com.itb.inf2dm.smartfishingd.model.entity.Pesqueiro;
import com.itb.inf2dm.smartfishingd.model.entity.Usuario;
import com.itb.inf2dm.smartfishingd.repository.ComentarioRepository;
import com.itb.inf2dm.smartfishingd.repository.DenunciaRepository;
import com.itb.inf2dm.smartfishingd.repository.PesqueiroRepository;
import com.itb.inf2dm.smartfishingd.repository.UsuarioRepository;

@Service
public class DenunciaService {

    @Autowired
    private DenunciaRepository denunciaRepository;

    @Autowired
    private ComentarioRepository comentarioRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PesqueiroRepository pesqueiroRepository;

    public record ComentarioDenunciado(
            Long comentarioId, String descricao, Integer nota, String dataCadastro,
            Long autorId, String autorNome, Long pesqueiroId, String pesqueiroNome,
            long quantidadeDenuncias
    ) {}

    public Denuncia denunciar(Long comentarioId, Long usuarioReportanteId) {
        comentarioRepository.findById(comentarioId)
                .orElseThrow(() -> new RuntimeException("Comentario não encontrado com o id " + comentarioId));

        denunciaRepository.findByComentarioIdAndUsuarioReportanteId(comentarioId, usuarioReportanteId)
                .ifPresent(d -> {
                    throw new IllegalStateException("Você já denunciou esse comentário");
                });

        Denuncia denuncia = new Denuncia();
        denuncia.setComentarioId(comentarioId);
        denuncia.setUsuarioReportanteId(usuarioReportanteId);
        denuncia.setDataCriacao(LocalDateTime.now());
        return denunciaRepository.save(denuncia);
    }

    public List<ComentarioDenunciado> listarComentariosDenunciados() {
        List<Denuncia> todas = denunciaRepository.findAll();

        Map<Long, Long> contagemPorComentario = new LinkedHashMap<>();
        for (Denuncia d : todas) {
            contagemPorComentario.merge(d.getComentarioId(), 1L, Long::sum);
        }

        return contagemPorComentario.entrySet().stream()
                .map(entry -> {
                    Long comentarioId = entry.getKey();
                    Comentario c = comentarioRepository.findById(comentarioId).orElse(null);
                    if (c == null) return null;
                    Usuario autor = usuarioRepository.findById(c.getUsuarioId()).orElse(null);
                    Pesqueiro pesqueiro = pesqueiroRepository.findById(c.getPesqueiroId()).orElse(null);
                    return new ComentarioDenunciado(
                            c.getId(), c.getDescricao(), c.getNota(), c.getDataCadastro() != null ? c.getDataCadastro().toString() : null,
                            autor != null ? autor.getId() : null, autor != null ? autor.getNome() : "Usuário removido",
                            pesqueiro != null ? pesqueiro.getId() : null, pesqueiro != null ? pesqueiro.getNome() : "Pesqueiro removido",
                            entry.getValue()
                    );
                })
                .filter(dto -> dto != null)
                .toList();
    }

    public void dispensarDenuncia(Long comentarioId) {
        List<Denuncia> existentes = denunciaRepository.findByComentarioId(comentarioId);
        if (existentes.isEmpty()) {
            throw new RuntimeException("Nenhuma denúncia encontrada para o comentário com id " + comentarioId);
        }
        denunciaRepository.deleteByComentarioId(comentarioId);
    }
}
