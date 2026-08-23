package com.itb.inf2dm.smartfishingd.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Denuncia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "comentarioId")
    private Long comentarioId;

    @Column(name = "usuarioReportanteId")
    private Long usuarioReportanteId;

    @Column(name = "dataCriacao")
    private LocalDateTime dataCriacao;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getComentarioId() {
        return comentarioId;
    }

    public void setComentarioId(Long comentarioId) {
        this.comentarioId = comentarioId;
    }

    public Long getUsuarioReportanteId() {
        return usuarioReportanteId;
    }

    public void setUsuarioReportanteId(Long usuarioReportanteId) {
        this.usuarioReportanteId = usuarioReportanteId;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
}
