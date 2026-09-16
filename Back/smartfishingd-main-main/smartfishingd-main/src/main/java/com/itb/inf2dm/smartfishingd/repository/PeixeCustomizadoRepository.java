package com.itb.inf2dm.smartfishingd.repository;

import java.util.List;

import com.itb.inf2dm.smartfishingd.model.entity.PeixeCustomizado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface PeixeCustomizadoRepository extends JpaRepository<PeixeCustomizado, Long> {

    List<PeixeCustomizado> findByPesqueiroId(Long pesqueiroId);

    long countByPesqueiroId(Long pesqueiroId);

    @Modifying
    @Transactional
    @Query("DELETE FROM PeixeCustomizado p WHERE p.pesqueiroId = :pesqueiroId")
    void deleteByPesqueiroId(@Param("pesqueiroId") Long pesqueiroId);
}
