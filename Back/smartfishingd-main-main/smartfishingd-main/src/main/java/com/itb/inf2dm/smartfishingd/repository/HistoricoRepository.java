package com.itb.inf2dm.smartfishingd.repository;

import java.util.List;

import com.itb.inf2dm.smartfishingd.model.entity.Historico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface HistoricoRepository extends JpaRepository<Historico, Long> {
    List<Historico> findByUsuarioIdOrderByDataAcessoDesc(Long usuarioId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Historico h WHERE h.usuarioId = :usuarioId")
    void deleteByUsuarioId(@Param("usuarioId") Long usuarioId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Historico h WHERE h.usuarioId = :usuarioId AND h.pesqueiroId = :pesqueiroId")
    void deleteByUsuarioIdAndPesqueiroId(@Param("usuarioId") Long usuarioId, @Param("pesqueiroId") Long pesqueiroId);
}
