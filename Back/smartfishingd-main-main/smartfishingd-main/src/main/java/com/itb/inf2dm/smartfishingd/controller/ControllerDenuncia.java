package com.itb.inf2dm.smartfishingd.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.itb.inf2dm.smartfishingd.model.entity.Denuncia;
import com.itb.inf2dm.smartfishingd.services.DenunciaService;

@RestController
@RequestMapping("/api/v1/denuncia")
public class ControllerDenuncia {

    @Autowired
    private DenunciaService denunciaService;

    @PostMapping
    public ResponseEntity<Object> denunciar(@RequestBody Denuncia denuncia, Authentication authentication) {
        try {
            Long usuarioId = (Long) authentication.getPrincipal();
            Denuncia novaDenuncia = denunciaService.denunciar(denuncia.getComentarioId(), usuarioId);
            return ResponseEntity.status(HttpStatus.CREATED).body(novaDenuncia);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(409).body(
                    Map.of(
                            "status", 409,
                            "error", "Conflict",
                            "message", e.getMessage()
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
    public ResponseEntity<List<DenunciaService.ComentarioDenunciado>> listarComentariosDenunciados() {
        return ResponseEntity.ok(denunciaService.listarComentariosDenunciados());
    }

    @DeleteMapping("/comentario/{comentarioId}")
    public ResponseEntity<Object> dispensarDenuncia(@PathVariable String comentarioId) {
        try {
            denunciaService.dispensarDenuncia(Long.parseLong(comentarioId));
            return ResponseEntity.ok().body(
                    Map.of(
                            "status", 200,
                            "message", "Denúncias dispensadas com sucesso!"
                    )
            );
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(
                    Map.of(
                            "status", 400,
                            "error", "Bad Request",
                            "message", "O comentarioId informado não é válido: " + comentarioId
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
}
