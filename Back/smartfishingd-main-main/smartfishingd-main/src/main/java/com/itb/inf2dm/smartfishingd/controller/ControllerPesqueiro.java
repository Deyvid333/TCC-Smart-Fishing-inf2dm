package com.itb.inf2dm.smartfishingd.controller;

import com.itb.inf2dm.smartfishingd.model.entity.Pesqueiro;
import com.itb.inf2dm.smartfishingd.services.PesqueiroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/v1/pesqueiro")
public class ControllerPesqueiro {
    @Autowired
    private PesqueiroService pesqueiroService;

    @GetMapping
    public ResponseEntity<List<Pesqueiro>> findAll() {
        return ResponseEntity.ok(pesqueiroService.findAll());
    }

    @GetMapping("/pendentes")
    public ResponseEntity<List<Pesqueiro>> findPendentes() {
        return ResponseEntity.ok(pesqueiroService.findPendentes());
    }

    @GetMapping("/meus")
    public ResponseEntity<List<Pesqueiro>> listarMeusPesqueiros(Authentication authentication) {
        Long usuarioId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(pesqueiroService.listarMeusPesqueiros(usuarioId));
    }

    @PostMapping
    public ResponseEntity<Object> salvarCatalogo(@RequestBody Pesqueiro pesqueiro, Authentication authentication) {
        try {
            Long usuarioId = (Long) authentication.getPrincipal();
            Pesqueiro novoPesqueiro = pesqueiroService.save(pesqueiro, usuarioId);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoPesqueiro);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    Map.of(
                            "status", 400,
                            "error", "Bad Request",
                            "message", e.getMessage()
                    )
            );
        } catch (IllegalStateException e) {
            return ResponseEntity.status(409).body(
                    Map.of(
                            "status", 409,
                            "error", "Conflict",
                            "message", e.getMessage()
                    )
            );
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> listarCatalogoPorId(@PathVariable String id) {
        try {
            return ResponseEntity.ok(pesqueiroService.findById(Long.parseLong(id)));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(
                    Map.of(
                            "status", 400,
                            "error", "bad request",
                            "message", "o id não é valido" + id
                    )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    Map.of(
                            "status", 404,
                            "error", "Not Found",
                            "message", "Pesqueiro não encontrado com o id: " + id
                    )
            );
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizarCatalogo(@PathVariable String id, @RequestBody Pesqueiro pesqueiro, Authentication authentication) {
        try {
            Long usuarioId = (Long) authentication.getPrincipal();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));
            return ResponseEntity.ok(pesqueiroService.update(Long.parseLong(id), pesqueiro, usuarioId, isAdmin));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(
                    Map.of(
                            "status", 400,
                            "error", "Bad Request",
                            "message", "O id informado não é válido: " + id
                    )
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    Map.of(
                            "status", 400,
                            "error", "Bad Request",
                            "message", e.getMessage()
                    )
            );
        } catch (SecurityException e) {
            return ResponseEntity.status(403).body(
                    Map.of(
                            "status", 403,
                            "error", "Forbidden",
                            "message", e.getMessage()
                    )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    Map.of(
                            "status", 404,
                            "error", "Not Found",
                            "message", "Produto não encontrado com o id: " + id
                    )
            );
        }
    }
    @PutMapping("/{id}/aprovar")
    public ResponseEntity<Object> aprovarPesqueiro(@PathVariable String id) {
        try {
            return ResponseEntity.ok(pesqueiroService.aprovar(Long.parseLong(id)));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(
                    Map.of(
                            "status", 400,
                            "error", "Bad Request",
                            "message", "O id informado não é válido: " + id
                    )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    Map.of(
                            "status", 404,
                            "error", "Not Found",
                            "message", "Pesqueiro não encontrado com o id: " + id
                    )
            );
        }
    }

    @PutMapping("/{id}/negar")
    public ResponseEntity<Object> negarPesqueiro(@PathVariable String id) {
        try {
            return ResponseEntity.ok(pesqueiroService.negar(Long.parseLong(id)));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(
                    Map.of(
                            "status", 400,
                            "error", "Bad Request",
                            "message", "O id informado não é válido: " + id
                    )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    Map.of(
                            "status", 404,
                            "error", "Not Found",
                            "message", "Pesqueiro não encontrado com o id: " + id
                    )
            );
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletarProdutoPorId(@PathVariable String id, Authentication authentication) {
        try {
            Long usuarioId = (Long) authentication.getPrincipal();
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));
            pesqueiroService.delete(Long.parseLong(id), usuarioId, isAdmin);
            return ResponseEntity.ok().body(
                    Map.of(
                            "status", 200,
                            "message", "Produto excluído com sucesso!"
                    ));
        }
        catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(
                    Map.of(
                            "status", 400,
                            "error", "Bad Request",
                            "message", "O id informado não é válido: " + id
                    )
            );
        }
        catch (SecurityException e) {
            return ResponseEntity.status(403).body(
                    Map.of(
                            "status", 403,
                            "error", "Forbidden",
                            "message", e.getMessage()
                    )
            );
        }
        catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    Map.of(
                            "status", 404,
                            "error", "Not Found",
                            "message", "Produto não encontrado com o id: " + id
                    )
            );
        }
    }



}
