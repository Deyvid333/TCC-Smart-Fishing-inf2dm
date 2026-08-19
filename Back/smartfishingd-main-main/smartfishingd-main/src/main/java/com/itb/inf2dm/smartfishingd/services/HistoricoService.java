package com.itb.inf2dm.smartfishingd.services;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itb.inf2dm.smartfishingd.model.entity.Historico;
import com.itb.inf2dm.smartfishingd.model.entity.Pesqueiro;
import com.itb.inf2dm.smartfishingd.repository.HistoricoRepository;
import com.itb.inf2dm.smartfishingd.repository.PesqueiroRepository;

@Service
public class HistoricoService {

    @Autowired
    private HistoricoRepository historicoRepository;

    @Autowired
    private PesqueiroRepository pesqueiroRepository;

    public Historico registrarAcesso(Long usuarioId, Long pesqueiroId) {
        Historico historico = new Historico();
        historico.setUsuarioId(usuarioId);
        historico.setPesqueiroId(pesqueiroId);
        historico.setDataAcesso(LocalDateTime.now());
        return historicoRepository.save(historico);
    }

    public List<Pesqueiro> listarHistoricoPorUsuario(Long usuarioId) {
        List<Historico> registros = historicoRepository.findByUsuarioIdOrderByDataAcessoDesc(usuarioId);

        Set<Long> pesqueiroIdsVistos = new LinkedHashSet<>();
        for (Historico registro : registros) {
            pesqueiroIdsVistos.add(registro.getPesqueiroId());
        }

        return pesqueiroIdsVistos.stream()
                .map(pesqueiroRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }
}
