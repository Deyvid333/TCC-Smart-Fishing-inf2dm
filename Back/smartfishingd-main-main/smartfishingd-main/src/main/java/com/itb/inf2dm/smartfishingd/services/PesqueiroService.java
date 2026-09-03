package com.itb.inf2dm.smartfishingd.services;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itb.inf2dm.smartfishingd.model.entity.Pesqueiro;
import com.itb.inf2dm.smartfishingd.model.entity.UsuarioPesqueiro;
import com.itb.inf2dm.smartfishingd.repository.CatalogoRepository;
import com.itb.inf2dm.smartfishingd.repository.ComentarioRepository;
import com.itb.inf2dm.smartfishingd.repository.PesqueiroRepository;
import com.itb.inf2dm.smartfishingd.repository.UsuarioPesqueiroRepository;
@Service
public class PesqueiroService {

    private static final int LIMITE_SOLICITACOES_SEM_APROVADO = 1;
    private static final int LIMITE_SOLICITACOES_COM_APROVADO = 5;

    @Autowired
    private UsuarioPesqueiroRepository usuarioPesqueiroRepository;

    @Autowired
    private PesqueiroRepository pesqueiroRepository;

    @Autowired
    private ComentarioRepository comentarioRepository;

    @Autowired
    private CatalogoRepository catalogoRepository;

    public List<Pesqueiro> findAll() {return pesqueiroRepository.findByAprovadoTrue();}

    public List<Pesqueiro> findPendentes() {return pesqueiroRepository.findByAprovadoIsNull();}

    public List<Pesqueiro> listarMeusPesqueiros(Long usuarioId) {
        List<UsuarioPesqueiro> vinculos = usuarioPesqueiroRepository.findByUsuarioId(usuarioId);
        List<Pesqueiro> meus = new ArrayList<>();
        for (UsuarioPesqueiro vinculo : vinculos) {
            pesqueiroRepository.findById(vinculo.getpesqueiroId()).ifPresent(meus::add);
        }
        return meus;
    }

    public Pesqueiro save(Pesqueiro pesqueiro, Long usuarioIdAutenticado) {
        validarCamposObrigatorios(pesqueiro);

        List<Pesqueiro> meus = listarMeusPesqueiros(usuarioIdAutenticado);
        boolean temAprovado = meus.stream().anyMatch(p -> Boolean.TRUE.equals(p.getAprovado()));
        long naoAprovados = meus.stream().filter(p -> !Boolean.TRUE.equals(p.getAprovado())).count();
        int limite = temAprovado ? LIMITE_SOLICITACOES_COM_APROVADO : LIMITE_SOLICITACOES_SEM_APROVADO;
        if (naoAprovados >= limite) {
            throw new IllegalStateException(
                "Você atingiu o limite de " + limite + " solicitação(ões) pendente(s). Aguarde a análise antes de enviar outra."
            );
        }

        if (pesqueiro.getInformacao() == null) pesqueiro.setInformacao("");
        pesqueiro.setAprovado(null);
        Pesqueiro novoPesqueiro = pesqueiroRepository.save(pesqueiro);

        UsuarioPesqueiro vinculo = new UsuarioPesqueiro();
        vinculo.setusuarioId(usuarioIdAutenticado);
        vinculo.setpesqueiroId(novoPesqueiro.getId());
        vinculo.setStatusUsuarioPesqueiro(true);
        usuarioPesqueiroRepository.save(vinculo);

        return novoPesqueiro;
    }

    public Pesqueiro update(Long id, Pesqueiro pesqueiro, Long usuarioIdAutenticado, boolean isAdmin) {
        if (!isAdmin && !isDono(id, usuarioIdAutenticado)) {
            throw new SecurityException("Você só pode editar o seu próprio pesqueiro");
        }
        validarCamposObrigatorios(pesqueiro);

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
        pesqueiroExistente.setInformacao(pesqueiro.getInformacao() != null ? pesqueiro.getInformacao() : "");
        pesqueiroExistente.setMapa(pesqueiro.getMapa());
        pesqueiroExistente.setCnpj(pesqueiro.getCnpj());
        pesqueiroExistente.setLinkMapa(pesqueiro.getLinkMapa());

        // Edicao pelo dono de um pedido negado/pendente volta para analise
        if (!isAdmin && !Boolean.TRUE.equals(pesqueiroExistente.getAprovado())) {
            pesqueiroExistente.setAprovado(null);
        }

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
                .orElseThrow(() -> new RuntimeException("Catalogo nao encontrado com o id " + id));
    }

    public void delete(Long id, Long usuarioIdAutenticado, boolean isAdmin) {
        Pesqueiro pesqueiroExistente = findById(id);
        if (!isAdmin && !isDono(id, usuarioIdAutenticado)) {
            throw new SecurityException("Você só pode apagar o seu próprio pesqueiro");
        }
        usuarioPesqueiroRepository.deleteByPesqueiroId(id);
        comentarioRepository.deleteByPesqueiroId(id);
        catalogoRepository.deleteByPesqueiroId(String.valueOf(id));
        pesqueiroRepository.delete(pesqueiroExistente);
    }

    private boolean isDono(Long pesqueiroId, Long usuarioId) {
        return usuarioPesqueiroRepository.findByPesqueiroId(pesqueiroId)
                .map(vinculo -> vinculo.getusuarioId().equals(usuarioId))
                .orElse(false);
    }

    private void validarCamposObrigatorios(Pesqueiro pesqueiro) {
        if (pesqueiro.getNome() == null || pesqueiro.getNome().isBlank()) {
            throw new IllegalArgumentException("O campo nome é obrigatório");
        }
        if (pesqueiro.getTelefone() == null || pesqueiro.getTelefone().isBlank()) {
            throw new IllegalArgumentException("O campo telefone é obrigatório");
        }
        if (pesqueiro.getDescricao() == null || pesqueiro.getDescricao().isBlank()) {
            throw new IllegalArgumentException("O campo descricao é obrigatório");
        }
        if (pesqueiro.getCnpj() == null || pesqueiro.getCnpj().isBlank()) {
            throw new IllegalArgumentException("O campo cnpj é obrigatório");
        }
        // informacao guarda dados opcionais (dias/preco/regras), por isso nao e obrigatorio
    }

}
