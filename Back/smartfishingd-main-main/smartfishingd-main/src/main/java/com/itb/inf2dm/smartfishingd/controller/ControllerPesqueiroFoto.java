package com.itb.inf2dm.smartfishingd.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.itb.inf2dm.smartfishingd.model.entity.PesqueiroFoto;
import com.itb.inf2dm.smartfishingd.services.PesqueiroFotoService;

@RestController
@RequestMapping("/api/v1/pesqueiro")
public class ControllerPesqueiroFoto {

    @Autowired
    private PesqueiroFotoService pesqueiroFotoService;

    @GetMapping("/{pesqueiroId}/fotos")
    public ResponseEntity<List<PesqueiroFoto>> listar(@PathVariable Long pesqueiroId) {
        return ResponseEntity.ok(pesqueiroFotoService.listar(pesqueiroId));
    }

    @PostMapping("/{pesqueiroId}/fotos")
    public ResponseEntity<Object> adicionar(@PathVariable Long pesqueiroId, @RequestBody Map<String, String> body, Authentication authentication) {
        try {
            Long usuarioId = (Long) authentication.getPrincipal();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));
            PesqueiroFoto foto = pesqueiroFotoService.adicionar(pesqueiroId, body.get("foto"), usuarioId, isAdmin);
            return ResponseEntity.status(HttpStatus.CREATED).body(foto);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(409).body(
                    Map.of("status", 409, "error", "Conflict", "message", e.getMessage())
            );
        } catch (SecurityException e) {
            return ResponseEntity.status(403).body(
                    Map.of("status", 403, "error", "Forbidden", "message", e.getMessage())
            );
        }
    }

    @DeleteMapping("/fotos/{fotoId}")
    public ResponseEntity<Object> remover(@PathVariable Long fotoId, Authentication authentication) {
        try {
            Long usuarioId = (Long) authentication.getPrincipal();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));
            pesqueiroFotoService.remover(fotoId, usuarioId, isAdmin);
            return ResponseEntity.ok(Map.of("status", 200, "message", "Foto removida com sucesso!"));
        } catch (SecurityException e) {
            return ResponseEntity.status(403).body(
                    Map.of("status", 403, "error", "Forbidden", "message", e.getMessage())
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    Map.of("status", 404, "error", "Not Found", "message", e.getMessage())
            );
        }
    }
}
