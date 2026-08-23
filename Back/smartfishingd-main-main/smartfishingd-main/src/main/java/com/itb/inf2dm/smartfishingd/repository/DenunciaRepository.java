package com.itb.inf2dm.smartfishingd.repository;

import java.util.List;
import java.util.Optional;

import com.itb.inf2dm.smartfishingd.model.entity.Denuncia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface DenunciaRepository extends JpaRepository<Denuncia, Long> {

    List<Denuncia> findAllByOrderByDataCriacaoDesc();

    Optional<Denuncia> findFirstByComentarioIdAndUsuarioReportanteId(Long comentarioId, Long usuarioReportanteId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Denuncia d WHERE d.comentarioId = :comentarioId")
    void deleteByComentarioId(@Param("comentarioId") Long comentarioId);
}
