package com.itb.inf2dm.smartfishingd.repository;

import java.util.List;
import java.util.Optional;

import com.itb.inf2dm.smartfishingd.model.entity.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritoRepository extends JpaRepository<Favorito, Long> {
    List<Favorito> findByUsuarioId(Long usuarioId);
    Optional<Favorito> findByUsuarioIdAndPesqueiroId(Long usuarioId, Long pesqueiroId);
}
