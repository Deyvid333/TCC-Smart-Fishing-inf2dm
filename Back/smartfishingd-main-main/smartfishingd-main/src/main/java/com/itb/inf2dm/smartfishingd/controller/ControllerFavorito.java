package com.itb.inf2dm.smartfishingd.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.itb.inf2dm.smartfishingd.model.entity.Favorito;
import com.itb.inf2dm.smartfishingd.model.entity.Pesqueiro;
import com.itb.inf2dm.smartfishingd.services.FavoritoService;

@RestController
@RequestMapping("/api/v1/favorito")
public class ControllerFavorito {

    @Autowired
    private FavoritoService favoritoService;

    @PostMapping
    public ResponseEntity<Object> favoritar(@RequestBody Favorito favorito, Authentication authentication) {
        try {
            Long usuarioId = (Long) authentication.getPrincipal();
            Favorito novoFavorito = favoritoService.favoritar(usuarioId, favorito.getPesqueiroId());
            return ResponseEntity.status(HttpStatus.CREATED).body(novoFavorito);
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

    @DeleteMapping("/pesqueiro/{pesqueiroId}")
    public ResponseEntity<Object> desfavoritar(@PathVariable String pesqueiroId, Authentication authentication) {
        try {
            Long usuarioId = (Long) authentication.getPrincipal();
            favoritoService.desfavoritar(usuarioId, Long.parseLong(pesqueiroId));
            return ResponseEntity.ok().body(
                    Map.of(
                            "status", 200,
                            "message", "Favorito removido com sucesso!"
                    )
            );
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(
                    Map.of(
                            "status", 400,
                            "error", "Bad Request",
                            "message", "O pesqueiroId informado não é válido"
                    )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    Map.of(
                            "status", 404,
                            "error", "Not Found",
                            "message", e.getMessage()
                    )
            );
        }
    }

    @GetMapping
    public ResponseEntity<Object> listarFavoritosPorUsuario(Authentication authentication) {
        Long usuarioId = (Long) authentication.getPrincipal();
        List<Pesqueiro> favoritos = favoritoService.listarFavoritosPorUsuario(usuarioId);
        return ResponseEntity.ok(favoritos);
    }
}
