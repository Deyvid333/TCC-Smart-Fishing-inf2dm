package com.itb.inf2dm.smartfishingd.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class PesqueiroFoto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pesqueiroId")
    private Long pesqueiroId;

    @Column(name = "foto")
    private String foto;

    @Column(name = "ordem")
    private Integer ordem;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPesqueiroId() {
        return pesqueiroId;
    }

    public void setPesqueiroId(Long pesqueiroId) {
        this.pesqueiroId = pesqueiroId;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public Integer getOrdem() {
        return ordem;
    }

    public void setOrdem(Integer ordem) {
        this.ordem = ordem;
    }
}
