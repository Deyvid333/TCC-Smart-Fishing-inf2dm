package com.itb.inf2dm.smartfishingd.security;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

/**
 * Limitador de tentativas simples (sem dependência externa, tudo em memória).
 * Cada "chave" (ex: "login:1.2.3.4") guarda os horários das tentativas recentes;
 * se passar do limite dentro da janela de tempo, bloqueia até as tentativas antigas expirarem.
 */
@Component
public class RateLimiterService {

    private final ConcurrentHashMap<String, Deque<Long>> tentativasPorChave = new ConcurrentHashMap<>();

    public boolean permitir(String chave, int maxTentativas, long janelaMs) {
        Deque<Long> historico = tentativasPorChave.computeIfAbsent(chave, k -> new ArrayDeque<>());
        synchronized (historico) {
            long agora = System.currentTimeMillis();
            while (!historico.isEmpty() && agora - historico.peekFirst() > janelaMs) {
                historico.pollFirst();
            }
            if (historico.size() >= maxTentativas) {
                return false;
            }
            historico.addLast(agora);
            return true;
        }
    }
}
