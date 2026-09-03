package com.itb.inf2dm.smartfishingd.services;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.itb.inf2dm.smartfishingd.model.entity.Usuario;
import com.itb.inf2dm.smartfishingd.repository.ComentarioRepository;
import com.itb.inf2dm.smartfishingd.repository.UsuarioPesqueiroRepository;
import com.itb.inf2dm.smartfishingd.repository.UsuarioRepository;
@Service

public class UsuarioService {
    @Autowired
private BCryptPasswordEncoder passwordEncoder;

@Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioPesqueiroRepository usuarioPesqueiroRepository;

    @Autowired
    private ComentarioRepository comentarioRepository;

    @Autowired
    private EmailService emailService;

    @Value("${app.jwt.reset-password-expiration-minutes}")
    private long tokenRedefinicaoExpiracaoMinutos;

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Usuario save(Usuario usuario) {
    usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
    usuario.setNivelAcesso("USUARIO");
    return usuarioRepository.save(usuario);
}

    public Usuario login(String email, String senha) {
    Usuario usuario = usuarioRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("Email não encontrado"));

    if (!passwordEncoder.matches(senha, usuario.getSenha())) {
        throw new RuntimeException("Senha incorreta");
    }

    if (Boolean.FALSE.equals(usuario.getStatusUsuario())) {
        throw new RuntimeException("Usuário banido. Entre em contato com o administrador.");
    }

    return usuario;
}

    public Usuario update(Long id, Usuario usuario) {
        Usuario usuarioExistente = findById(id);
        usuarioExistente.setNome(usuario.getNome());
        usuarioExistente.setEmail(usuario.getEmail());
        if (usuario.getSenha() != null && !usuario.getSenha().isBlank()) {
            usuarioExistente.setSenha(passwordEncoder.encode(usuario.getSenha()));
        }
        usuarioExistente.setId(id);
        usuarioExistente.setFoto(usuario.getFoto());
        usuarioExistente.setDataCadastro(usuario.getDataCadastro());
        return usuarioRepository.save(usuarioExistente);
    }
    public Usuario banir(Long id) {
        Usuario usuarioExistente = findById(id);
        usuarioExistente.setStatusUsuario(false);
        return usuarioRepository.save(usuarioExistente);
    }
    public Usuario desbanir(Long id) {
        Usuario usuarioExistente = findById(id);
        usuarioExistente.setStatusUsuario(true);
        return usuarioRepository.save(usuarioExistente);
    }
    public void esqueciSenha(String email) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);
        if (usuarioOpt.isEmpty()) {
            return;
        }
        Usuario usuario = usuarioOpt.get();
        String token = UUID.randomUUID().toString();
        usuario.setTokenRedefinicaoSenha(token);
        usuario.setTokenRedefinicaoExpiracao(LocalDateTime.now().plusMinutes(tokenRedefinicaoExpiracaoMinutos));
        usuarioRepository.save(usuario);
        emailService.enviarEmailRedefinicaoSenha(usuario.getEmail(), token);
    }

    public void redefinirSenha(String token, String novaSenha) {
        Usuario usuario = usuarioRepository.findByTokenRedefinicaoSenha(token)
                .orElseThrow(() -> new RuntimeException("Token inválido"));

        if (usuario.getTokenRedefinicaoExpiracao() == null
                || usuario.getTokenRedefinicaoExpiracao().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expirado. Solicite a redefinição novamente.");
        }

        usuario.setSenha(passwordEncoder.encode(novaSenha));
        usuario.setTokenRedefinicaoSenha(null);
        usuario.setTokenRedefinicaoExpiracao(null);
        usuarioRepository.save(usuario);
    }

    public Usuario findById(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Catalogo nao encontrado com o id " + id));
    }
    public void delete(Long id) {
        Usuario usuarioExistente = findById(id);
        usuarioPesqueiroRepository.deleteByUsuarioId(id);
        comentarioRepository.deleteByUsuarioId(id);
        usuarioRepository.delete(usuarioExistente);
    }
}