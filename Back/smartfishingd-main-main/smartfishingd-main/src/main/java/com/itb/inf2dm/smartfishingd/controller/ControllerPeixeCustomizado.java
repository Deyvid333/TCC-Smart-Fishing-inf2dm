package com.itb.inf2dm.smartfishingd.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.itb.inf2dm.smartfishingd.model.entity.PeixeCustomizado;
import com.itb.inf2dm.smartfishingd.services.PeixeCustomizadoService;

@RestController
@RequestMapping("/api/v1/pesqueiro")
public class ControllerPeixeCustomizado {

    @Autowired
    private PeixeCustomizadoService peixeCustomizadoService;

    @GetMapping("/{pesqueiroId}/peixes-customizados")
    public ResponseEntity<List<PeixeCustomizado>> listar(@PathVariable Long pesqueiroId) {
        return ResponseEntity.ok(peixeCustomizadoService.listar(pesqueiroId));
    }

    @PostMapping("/{pesqueiroId}/peixes-customizados")
    public ResponseEntity<Object> adicionar(@PathVariable Long pesqueiroId, @RequestBody Map<String, String> body, Authentication authentication) {
        try {
            Long usuarioId = (Long) authentication.getPrincipal();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));
            PeixeCustomizado peixe = peixeCustomizadoService.adicionar(pesqueiroId, body.get("nome"), body.get("foto"), body.get("descricao"), usuarioId, isAdmin);
            return ResponseEntity.status(HttpStatus.CREATED).body(peixe);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(
                    Map.of("status", 400, "error", "Bad Request", "message", e.getMessage())
            );
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

    @PutMapping("/peixes-customizados/{peixeId}")
    public ResponseEntity<Object> atualizar(@PathVariable Long peixeId, @RequestBody Map<String, String> body, Authentication authentication) {
        try {
            Long usuarioId = (Long) authentication.getPrincipal();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));
            PeixeCustomizado peixe = peixeCustomizadoService.atualizar(peixeId, body.get("nome"), body.get("foto"), body.get("descricao"), usuarioId, isAdmin);
            return ResponseEntity.ok(peixe);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(
                    Map.of("status", 400, "error", "Bad Request", "message", e.getMessage())
            );
        } catch (IllegalStateException e) {
            return ResponseEntity.status(409).body(
                    Map.of("status", 409, "error", "Conflict", "message", e.getMessage())
            );
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

    @DeleteMapping("/peixes-customizados/{peixeId}")
    public ResponseEntity<Object> remover(@PathVariable Long peixeId, Authentication authentication) {
        try {
            Long usuarioId = (Long) authentication.getPrincipal();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));
            peixeCustomizadoService.remover(peixeId, usuarioId, isAdmin);
            return ResponseEntity.ok(Map.of("status", 200, "message", "Peixe removido com sucesso!"));
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
