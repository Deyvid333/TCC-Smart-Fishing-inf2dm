package com.itb.inf2dm.smartfishingd.services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itb.inf2dm.smartfishingd.model.entity.Pesqueiro;
import com.itb.inf2dm.smartfishingd.model.entity.UsuarioPesqueiro;
import com.itb.inf2dm.smartfishingd.repository.PesqueiroRepository;
import com.itb.inf2dm.smartfishingd.repository.UsuarioPesqueiroRepository;
@Service
public class PesqueiroService {
    @Autowired
    
private UsuarioPesqueiroRepository usuarioPesqueiroRepository;

    @Autowired
    private PesqueiroRepository pesqueiroRepository;
    public List<Pesqueiro> findAll() {return pesqueiroRepository.findByAprovadoTrue();}

    public List<Pesqueiro> findPendentes() {return pesqueiroRepository.findByAprovadoIsNull();}

   public Pesqueiro save(Pesqueiro pesqueiro) {
    pesqueiro.setAprovado(null);
    Pesqueiro novoPesqueiro = pesqueiroRepository.save(pesqueiro);

    UsuarioPesqueiro vinculo = new UsuarioPesqueiro();
    vinculo.setusuarioId(pesqueiro.getUsuarioId());
    vinculo.setpesqueiroId(novoPesqueiro.getId());
    vinculo.setStatusUsuarioPesqueiro(true);
    usuarioPesqueiroRepository.save(vinculo);

    return novoPesqueiro;
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
    pesqueiroExistente.setFoto(pesqueiro.getFoto());
    pesqueiroExistente.setInformacao(pesqueiro.getInformacao());
    pesqueiroExistente.setMapa(pesqueiro.getMapa());
        return pesqueiroRepository.save(pesqueiroExistente);
    }
    public Pesqueiro aprovar(Long id) {
        Pesqueiro pesqueiroExistente = findById(id);
        pesqueiroExistente.setAprovado(true);
        return pesqueiroRepository.save(pesqueiroExistente);
    }
    public Pesqueiro negar(Long id) {
        Pesqueiro pesqueiroExistente = findById(id);
        pesqueiroExistente.setAprovado(false);
        return pesqueiroRepository.save(pesqueiroExistente);
    }
    public Pesqueiro findById(Long id) {
        return pesqueiroRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Catalogo nao encontrado com o id " + id));
    }
    public void delete(Long id) {
        Pesqueiro pesqueiroExistente = findById(id);
        pesqueiroRepository.delete(pesqueiroExistente);
    }

}
