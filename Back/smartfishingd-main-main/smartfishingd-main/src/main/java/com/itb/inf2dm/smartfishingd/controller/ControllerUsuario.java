package com.itb.inf2dm.smartfishingd.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itb.inf2dm.smartfishingd.model.entity.Usuario;
import com.itb.inf2dm.smartfishingd.security.JwtUtil;
import com.itb.inf2dm.smartfishingd.services.UsuarioService;

@RestController
@RequestMapping("/api/v1/usuario")
public class ControllerUsuario {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<List<Usuario>> findAll() {
        return ResponseEntity.ok(usuarioService.findAll());
    }

    @PostMapping
    public ResponseEntity<Usuario> salvarUsuario(@RequestBody Usuario usuario) {
        Usuario novoUsuario = usuarioService.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> listarUsuarioPorId(@PathVariable String id) {
        try {
            return ResponseEntity.ok(usuarioService.findById(Long.parseLong(id)));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(
                    Map.of(
                            "status", 400,
                            "error", "bad request",
                            "message", "o id não é valido: " + id
                    )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    Map.of(
                            "status", 404,
                            "error", "not found",
                            "message", "Usuario não encontrado com o id: " + id
                    )
            );
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizarUsuario(@PathVariable String id, @RequestBody Usuario usuario) {
        try {
            return ResponseEntity.ok(usuarioService.update(Long.parseLong(id), usuario));
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
                            "message", "Usuario não encontrado com o id: " + id
                    )
            );
        }
    }

        @PostMapping("/login")
public ResponseEntity<Object> login(@RequestBody Usuario usuario) {
    try {
        Usuario usuarioLogado = usuarioService.login(
            usuario.getEmail(),
            usuario.getSenha()
        );
        usuarioLogado.setSenha(null);
        String token = jwtUtil.gerarToken(
            usuarioLogado.getId(),
            usuarioLogado.getEmail(),
            usuarioLogado.getNivelAcesso()
        );
        return ResponseEntity.ok(
            Map.of(
                "token", token,
                "usuario", usuarioLogado
            )
        );
    } catch (RuntimeException e) {
        return ResponseEntity.status(401).body(
            Map.of(
                "status", 401,
                "error", "Unauthorized",
                "message", e.getMessage()
            )
        );
    }
}

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletarUsuarioPorId(@PathVariable String id) {
        try {
            usuarioService.delete(Long.parseLong(id));
            return ResponseEntity.ok().body(
                    Map.of(
                            "status", 200,
                            "message", "Usuario excluído com sucesso!"
                    ));
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
                            "message", "Usuario não encontrado com o id: " + id
                    )
            );
        }
    }
}
