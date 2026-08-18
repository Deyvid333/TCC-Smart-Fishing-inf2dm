package com.itb.inf2dm.smartfishingd.repository;
import com.itb.inf2dm.smartfishingd.model.entity.UsuarioPesqueiro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository

public interface UsuarioPesqueiroRepository extends JpaRepository<UsuarioPesqueiro, Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM UsuarioPesqueiro u WHERE u.usuarioId = :usuarioId")
    void deleteByUsuarioId(Long usuarioId);

    @Modifying
    @Transactional
    @Query("DELETE FROM UsuarioPesqueiro u WHERE u.pesqueiroId = :pesqueiroId")
    void deleteByPesqueiroId(Long pesqueiroId);
}
