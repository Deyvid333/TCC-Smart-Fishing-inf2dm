package com.itb.inf2dm.smartfishingd.repository;

import com.itb.inf2dm.smartfishingd.model.entity.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Long> {

    @Modifying
    @Transactional
    @Query("DELETE FROM Comentario c WHERE c.pesqueiroId = :pesqueiroId")
    void deleteByPesqueiroId(@Param("pesqueiroId") Long pesqueiroId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Comentario c WHERE c.usuarioId = :usuarioId")
    void deleteByUsuarioId(@Param("usuarioId") Long usuarioId);
}