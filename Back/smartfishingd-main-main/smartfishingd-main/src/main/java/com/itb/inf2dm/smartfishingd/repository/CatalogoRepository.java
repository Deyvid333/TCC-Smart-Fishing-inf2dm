package com.itb.inf2dm.smartfishingd.repository;
import com.itb.inf2dm.smartfishingd.model.entity.Catalogo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository

public interface CatalogoRepository extends JpaRepository<Catalogo, Long> {

    @Modifying
    @Transactional
    @Query("DELETE FROM Catalogo c WHERE c.pesqueiroId = :pesqueiroId")
    void deleteByPesqueiroId(@Param("pesqueiroId") String pesqueiroId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Catalogo c WHERE c.peixeId = :peixeId")
    void deleteByPeixeId(@Param("peixeId") String peixeId);
}
