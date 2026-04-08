package com.itb.inf2dm.smartfishingd.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UsuarioPesqueiro {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "usuarioId")
    private Long usuarioId;
    @Column(name = "pesqueiroId")
    private Long pesqueiroId;
    @Column(name = "statusUsuarioPesqueiro")
    private Boolean statusUsuarioPesqueiro;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getusuarioId() {
        return usuarioId;
    }

    public void setusuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getpesqueiroId() {
        return pesqueiroId;
    }

    public void setpesqueiroId(Long pesqueiroId) {
        this.pesqueiroId = pesqueiroId;
    }
     public Boolean getStatusUsuarioPesqueiro() {
        return statusUsuarioPesqueiro;
    }

    public void setStatusUsuarioPesqueiro(Boolean statusUsuarioPesqueiro) {
        this.statusUsuarioPesqueiro = statusUsuarioPesqueiro;
    }
}

