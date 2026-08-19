package com.itb.inf2dm.smartfishingd.repository;

import java.util.List;

import com.itb.inf2dm.smartfishingd.model.entity.Historico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoricoRepository extends JpaRepository<Historico, Long> {
    List<Historico> findByUsuarioIdOrderByDataAcessoDesc(Long usuarioId);
}
