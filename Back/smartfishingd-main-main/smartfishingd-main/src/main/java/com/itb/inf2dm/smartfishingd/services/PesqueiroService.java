package com.itb.inf2dm.smartfishingd.services;
import com.itb.inf2dm.smartfishingd.model.entity.Pesqueiro;
import com.itb.inf2dm.smartfishingd.repository.ComentarioRepository;
import com.itb.inf2dm.smartfishingd.repository.PesqueiroRepository;
import com.itb.inf2dm.smartfishingd.repository.UsuarioPesqueiroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import jakarta.transaction.Transactional;

@Service
public class PesqueiroService {
    @Autowired
    private PesqueiroRepository pesqueiroRepository;
    @Autowired
    private UsuarioPesqueiroRepository usuarioPesqueiroRepository;
    @Autowired
    private ComentarioRepository comentarioRepository;

    public List<Pesqueiro> findAll() {return pesqueiroRepository.findAll();}

    public Pesqueiro save(Pesqueiro pesqueiro) {
        return pesqueiroRepository.save(pesqueiro);
    }
    public Pesqueiro update (Long id, Pesqueiro pesqueiro) {
    Pesqueiro pesqueiroExistente = findById(id);
    pesqueiroExistente.setNome(pesqueiro.getNome());
    pesqueiroExistente.setCep(pesqueiro.getCep());
    pesqueiroExistente.setNumero(pesqueiro.getNumero());
    pesqueiroExistente.setComplemento(pesqueiro.getComplemento());
    pesqueiroExistente.setDescricao(pesqueiro.getDescricao());
    pesqueiroExistente.setTelefone(pesqueiro.getTelefone());
    pesqueiroExistente.setId(id);
    pesqueiroExistente.setDataCadastro(pesqueiro.getDataCadastro());
    pesqueiroExistente.setStatusPesqueiro(pesqueiro.getStatusPesqueiro());
    pesqueiroExistente.setFoto(pesqueiro.getFoto());
    pesqueiroExistente.setInformacao(pesqueiro.getInformacao());
    pesqueiroExistente.setMapa(pesqueiro.getMapa());
        return pesqueiroRepository.save(pesqueiroExistente);
    }
    public Pesqueiro findById(Long id) {
        return pesqueiroRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Catalogo nao encontrado com o id " + id));
    }
    @Transactional
    public void delete(Long id) {
        Pesqueiro pesqueiroExistente = findById(id);
        usuarioPesqueiroRepository.deleteByPesqueiroId(id);
        comentarioRepository.deleteByPesqueiroId(id);
        pesqueiroRepository.delete(pesqueiroExistente);
    }

}
