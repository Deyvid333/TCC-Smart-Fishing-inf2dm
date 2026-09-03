package com.itb.inf2dm.smartfishingd.repository;

import java.util.List;

import com.itb.inf2dm.smartfishingd.model.entity.PesqueiroFoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface PesqueiroFotoRepository extends JpaRepository<PesqueiroFoto, Long> {

    List<PesqueiroFoto> findByPesqueiroIdOrderByOrdemAsc(Long pesqueiroId);

    long countByPesqueiroId(Long pesqueiroId);

    @Modifying
    @Transactional
    @Query("DELETE FROM PesqueiroFoto f WHERE f.pesqueiroId = :pesqueiroId")
    void deleteByPesqueiroId(@Param("pesqueiroId") Long pesqueiroId);
}
