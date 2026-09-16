package com.itb.inf2dm.smartfishingd.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
import com.itb.inf2dm.smartfishingd.security.RateLimiterService;
import com.itb.inf2dm.smartfishingd.services.UsuarioService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/usuario")
public class ControllerUsuario {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RateLimiterService rateLimiterService;

    private static boolean isAdmin(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));
    }

    private static String ipDoCliente(HttpServletRequest request) {
        return request.getRemoteAddr();
    }

    private static ResponseEntity<Object> respostaMuitasTentativas(String mensagem) {
        return ResponseEntity.status(429).body(
                Map.of("status", 429, "error", "Too Many Requests", "message", mensagem)
        );
    }

    private static Usuario sanitizar(Usuario usuario) {
        usuario.setSenha(null);
        usuario.setTokenRedefinicaoSenha(null);
        usuario.setTokenRedefinicaoExpiracao(null);
        return usuario;
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> findAll() {
        List<Usuario> usuarios = usuarioService.findAll();
        usuarios.forEach(ControllerUsuario::sanitizar);
        return ResponseEntity.ok(usuarios);
    }

    @PostMapping
    public ResponseEntity<Object> salvarUsuario(@RequestBody Usuario usuario, HttpServletRequest request) {
        if (!rateLimiterService.permitir("cadastro:" + ipDoCliente(request), 5, 60 * 60 * 1000)) {
            return respostaMuitasTentativas("Muitos cadastros feitos a partir deste endereço. Tente novamente mais tarde.");
        }
        Usuario novoUsuario = usuarioService.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(sanitizar(novoUsuario));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> listarUsuarioPorId(@PathVariable String id) {
        try {
            return ResponseEntity.ok(sanitizar(usuarioService.findById(Long.parseLong(id))));
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
    public ResponseEntity<Object> atualizarUsuario(@PathVariable String id, @RequestBody Usuario usuario, Authentication authentication) {
        try {
            Long usuarioIdAutenticado = (Long) authentication.getPrincipal();
            Long idAlvo = Long.parseLong(id);
            if (!usuarioIdAutenticado.equals(idAlvo) && !isAdmin(authentication)) {
                return ResponseEntity.status(403).body(
                        Map.of(
                                "status", 403,
                                "error", "Forbidden",
                                "message", "Você só pode editar a sua própria conta."
                        )
                );
            }
            return ResponseEntity.ok(sanitizar(usuarioService.update(idAlvo, usuario)));
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

    @PutMapping("/{id}/banir")
    public ResponseEntity<Object> banirUsuario(@PathVariable String id, Authentication authentication) {
        try {
            Long usuarioIdAutenticado = (Long) authentication.getPrincipal();
            if (usuarioIdAutenticado.equals(Long.parseLong(id))) {
                return ResponseEntity.status(400).body(
                        Map.of(
                                "status", 400,
                                "error", "Bad Request",
                                "message", "Você não pode banir a si mesmo."
                        )
                );
            }
            return ResponseEntity.ok(sanitizar(usuarioService.banir(Long.parseLong(id))));
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

    @PutMapping("/{id}/desbanir")
    public ResponseEntity<Object> desbanirUsuario(@PathVariable String id) {
        try {
            return ResponseEntity.ok(sanitizar(usuarioService.desbanir(Long.parseLong(id))));
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

        @PutMapping("/{id}/nivel-acesso")
    public ResponseEntity<Object> alterarNivelAcesso(@PathVariable String id, @RequestBody Map<String, String> body, Authentication authentication) {
        try {
            Long usuarioIdAutenticado = (Long) authentication.getPrincipal();
            Usuario usuario = usuarioService.alterarNivelAcesso(Long.parseLong(id), body.get("nivelAcesso"), usuarioIdAutenticado);
            return ResponseEntity.ok(sanitizar(usuario));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(
                    Map.of("status", 400, "error", "Bad Request", "message", "O id informado não é válido: " + id)
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    Map.of("status", 400, "error", "Bad Request", "message", e.getMessage())
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    Map.of("status", 404, "error", "Not Found", "message", "Usuario não encontrado com o id: " + id)
            );
        }
    }

    @PostMapping("/login")
public ResponseEntity<Object> login(@RequestBody Usuario usuario, HttpServletRequest request) {
    String chaveIp = "login:" + ipDoCliente(request);
    String chaveEmail = "login-email:" + (usuario.getEmail() != null ? usuario.getEmail().toLowerCase() : "desconhecido");
    if (!rateLimiterService.permitir(chaveIp, 10, 60 * 1000) || !rateLimiterService.permitir(chaveEmail, 5, 60 * 1000)) {
        return respostaMuitasTentativas("Muitas tentativas de login. Aguarde um minuto e tente novamente.");
    }
    try {
        Usuario usuarioLogado = usuarioService.login(
            usuario.getEmail(),
            usuario.getSenha()
        );
        sanitizar(usuarioLogado);
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

    @PostMapping("/esqueci-senha")
    public ResponseEntity<Object> esqueciSenha(@RequestBody Map<String, String> body, HttpServletRequest request) {
        String email = body.get("email") != null ? body.get("email").toLowerCase() : "desconhecido";
        if (!rateLimiterService.permitir("esqueci-senha:" + ipDoCliente(request), 5, 15 * 60 * 1000)
                || !rateLimiterService.permitir("esqueci-senha-email:" + email, 3, 15 * 60 * 1000)) {
            return respostaMuitasTentativas("Muitos pedidos de redefinição de senha. Aguarde alguns minutos e tente novamente.");
        }
        usuarioService.esqueciSenha(body.get("email"));
        return ResponseEntity.ok(
                Map.of(
                        "status", 200,
                        "message", "Se o e-mail informado existir, enviamos as instruções de redefinição de senha."
                )
        );
    }

    @PostMapping("/redefinir-senha")
    public ResponseEntity<Object> redefinirSenha(@RequestBody Map<String, String> body, HttpServletRequest request) {
        if (!rateLimiterService.permitir("redefinir-senha:" + ipDoCliente(request), 10, 15 * 60 * 1000)) {
            return respostaMuitasTentativas("Muitas tentativas de redefinição de senha. Aguarde alguns minutos e tente novamente.");
        }
        try {
            usuarioService.redefinirSenha(body.get("token"), body.get("novaSenha"));
            return ResponseEntity.ok(
                    Map.of(
                            "status", 200,
                            "message", "Senha redefinida com sucesso!"
                    )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                    Map.of(
                            "status", 400,
                            "error", "Bad Request",
                            "message", e.getMessage()
                    )
            );
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletarUsuarioPorId(@PathVariable String id, Authentication authentication) {
        try {
            Long usuarioIdAutenticado = (Long) authentication.getPrincipal();
            Long idAlvo = Long.parseLong(id);
            if (!usuarioIdAutenticado.equals(idAlvo) && !isAdmin(authentication)) {
                return ResponseEntity.status(403).body(
                        Map.of(
                                "status", 403,
                                "error", "Forbidden",
                                "message", "Você só pode excluir a sua própria conta."
                        )
                );
            }
            usuarioService.delete(idAlvo);
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
