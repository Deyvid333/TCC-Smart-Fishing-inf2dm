package com.itb.inf2dm.smartfishingd.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class Catalogo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "peixeId")
    private String peixeId;
    @Column(name = "pesqueiroId")
    private String pesqueiroId;
    @Column(name = "statusCatalogo")
    private Boolean statusCatalogo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getpeixeId() {
        return peixeId;
    }

    public void setpeixeId(String peixeId) {
        this.peixeId = peixeId;
    }

    public String getpesqueiroId() {
        return pesqueiroId;
    }

    public void setpesqueiroId(String pesqueiroId) {
        this.pesqueiroId = pesqueiroId;
    }

    public Boolean getStatusCatalogo() {
        return statusCatalogo;
    }

    public void setStatusCatalogo(Boolean statusCatalogo) {
        this.statusCatalogo = statusCatalogo;
    }
}
