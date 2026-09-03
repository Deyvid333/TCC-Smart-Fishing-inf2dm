package com.itb.inf2dm.smartfishingd.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${app.frontend.reset-password-url}")
    private String resetPasswordUrl;

    @Value("${spring.mail.username}")
    private String remetente;

    public void enviarEmailRedefinicaoSenha(String destinatario, String token) {
        String link = resetPasswordUrl + "?token=" + token;

        SimpleMailMessage mensagem = new SimpleMailMessage();
        mensagem.setFrom(remetente);
        mensagem.setTo(destinatario);
        mensagem.setSubject("SmartFishing - Redefinição de senha");
        mensagem.setText(
                "Você solicitou a redefinição da sua senha no SmartFishing.\n\n" +
                "Clique no link abaixo para escolher uma nova senha:\n" +
                link + "\n\n" +
                "Esse link expira em 1 hora. Se você não solicitou essa redefinição, ignore este e-mail."
        );
        javaMailSender.send(mensagem);
    }
}
