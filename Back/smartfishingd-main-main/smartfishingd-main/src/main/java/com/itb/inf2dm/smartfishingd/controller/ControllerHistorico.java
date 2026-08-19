package com.itb.inf2dm.smartfishingd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.itb.inf2dm.smartfishingd.model.entity.Historico;
import com.itb.inf2dm.smartfishingd.model.entity.Pesqueiro;
import com.itb.inf2dm.smartfishingd.services.HistoricoService;

@RestController
@RequestMapping("/api/v1/historico")
public class ControllerHistorico {

    @Autowired
    private HistoricoService historicoService;

    @PostMapping
    public ResponseEntity<Historico> registrarAcesso(@RequestBody Historico historico, Authentication authentication) {
        Long usuarioId = (Long) authentication.getPrincipal();
        Historico novoHistorico = historicoService.registrarAcesso(usuarioId, historico.getPesqueiroId());
        return ResponseEntity.status(HttpStatus.CREATED).body(novoHistorico);
    }

    @GetMapping
    public ResponseEntity<Object> listarHistoricoPorUsuario(Authentication authentication) {
        Long usuarioId = (Long) authentication.getPrincipal();
        List<Pesqueiro> historico = historicoService.listarHistoricoPorUsuario(usuarioId);
        return ResponseEntity.ok(historico);
    }
}
