import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import PesqueiroService from './services/PesqueiroService';
import UsuarioService from './services/UsuarioService';
import UsuarioPesqueiroService from './services/UsuarioPesqueiroService';

const formInicial = {
  nome: '',
  telefone: '',
  descricao: '',
  informacao: '',
  regrasPermitido: '',
  regrasProibido: '',
  catalogoPeixes: '',
  cep: '',
  numero: '',
  complemento: '',
  statusPesqueiro: true,
};

const parseInformacao = (informacao) => {
  if (!informacao) return null;

  try {
    const parsed = JSON.parse(informacao);
    if (typeof parsed === 'string') {
      return { detalhamento: parsed };
    }
    return parsed;
  } catch {
    return { detalhamento: informacao };
  }
};

const formatInformacao = (data) => {
  return JSON.stringify({
    detalhamento: data.informacao || '',
    regrasPermitido: (data.regrasPermitido || '')
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean),
    regrasProibido: (data.regrasProibido || '')
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean),
    catalogoPeixes: (data.catalogoPeixes || '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
  });
};

function AdminDashboard() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [pesqueiro, setPesqueiro] = useState(null);
  const [formData, setFormData] = useState(formInicial);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    const carregarDados = async () => {
      const usuarioLogado = UsuarioService.getCurrentUser();

      if (!usuarioLogado || usuarioLogado.nivelAcesso !== 'admin') {
        navigate('/login');
        return;
      }

      setUsuario(usuarioLogado);

      try {
        const vinculo = await UsuarioPesqueiroService.findByUsuarioId(usuarioLogado.id);

        if (vinculo?.pesqueiroId) {
          const response = await PesqueiroService.findById(vinculo.pesqueiroId);
          const info = parseInformacao(response.data.informacao);
          setPesqueiro(response.data);
          setFormData({
            ...formInicial,
            ...response.data,
            informacao: info?.detalhamento || response.data.informacao || '',
            regrasPermitido: (info?.regrasPermitido || []).join('\n'),
            regrasProibido: (info?.regrasProibido || []).join('\n'),
            catalogoPeixes: (info?.catalogoPeixes || []).join(', '),
            foto: undefined,
            mapa: undefined,
          });
        } else {
          setIsEditing(true);
        }
      } catch (error) {
        setErro('Não foi possível carregar os dados do seu pesqueiro.');
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const validarFormulario = () => {
    if (!formData.nome.trim()) return 'Informe o nome do pesqueiro.';
    if (!formData.telefone.trim()) return 'Informe um telefone de contato.';
    if (!formData.descricao.trim()) return 'Escreva uma descrição para aparecer aos pescadores.';
    if (!formData.informacao.trim()) return 'Adicione informações rápidas sobre o pesqueiro.';
    if (!formData.catalogoPeixes.trim()) return 'Adicione pelo menos um peixe ao catálogo.';
    return '';
  };

  const handleSave = async () => {
    const erroValidacao = validarFormulario();
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    setSaving(true);
    setErro('');
    setMensagem('');

    const payload = {
      nome: formData.nome,
      telefone: formData.telefone,
      descricao: formData.descricao,
      informacao: formatInformacao(formData),
      cep: formData.cep,
      numero: formData.numero,
      complemento: formData.complemento,
      statusPesqueiro: true,
      dataCadastro: formData.dataCadastro || new Date().toISOString().split('T')[0],
    };

    try {
      if (pesqueiro?.id) {
        const response = await PesqueiroService.update(pesqueiro.id, payload);
        setPesqueiro(response.data);
        setFormData({ ...formInicial, ...response.data, foto: undefined, mapa: undefined });
        setMensagem('Pesqueiro atualizado com sucesso.');
      } else {
        const response = await PesqueiroService.criar(payload);
        await UsuarioPesqueiroService.criar({
          usuarioId: usuario.id,
          pesqueiroId: response.data.id,
          statusUsuarioPesqueiro: true,
        });
        setPesqueiro(response.data);
        setFormData({ ...formInicial, ...response.data, foto: undefined, mapa: undefined });
        setMensagem('Pesqueiro criado e vinculado à sua conta.');
      }

      setIsEditing(false);
    } catch (error) {
      setErro('Erro ao salvar. Verifique se o back está rodando e tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (pesqueiro) {
      setFormData({ ...formInicial, ...pesqueiro, foto: undefined, mapa: undefined });
      setIsEditing(false);
      setErro('');
    }
  };

  const handleLogout = () => {
    UsuarioService.logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="admin-layout">
        <div className="container-fluid mt-4">
          <p>Carregando painel...</p>
        </div>
      </div>
    );
  }

  const infoDetalhes = parseInformacao(pesqueiro?.informacao || '');
  const catalogoPeixes = (infoDetalhes?.catalogoPeixes || []).filter(Boolean);
  const regrasPermitido = (infoDetalhes?.regrasPermitido || []).filter(Boolean);
  const regrasProibido = (infoDetalhes?.regrasProibido || []).filter(Boolean);
  const informacoesRapidas = (infoDetalhes?.detalhamento || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

  const totalCamposPreenchidos = ['nome', 'telefone', 'descricao', 'informacao', 'catalogoPeixes', 'regrasPermitido', 'regrasProibido', 'cep', 'numero', 'complemento']
    .filter((campo) => formData[campo]?.toString().trim()).length;

  return (
    <div className="admin-layout">
      <div className="admin-header">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-3">
            <div>
              <h2 className="mb-1">Painel do Proprietário</h2>
              <p className="text-muted mb-0">
                {pesqueiro ? `Gerenciando: ${pesqueiro.nome}` : 'Cadastre seu primeiro pesqueiro'}
              </p>
              <small className="text-success">Conectado como {usuario?.nome}</small>
            </div>
            <div className="admin-nav">
              {pesqueiro && !isEditing && (
                <button className="btn btn-primary me-2" onClick={() => setIsEditing(true)}>
                  Editar dados
                </button>
              )}
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-4">
        {mensagem && <div className="alert alert-success">{mensagem}</div>}
        {erro && <div className="alert alert-danger">{erro}</div>}

        <div className="row g-4">
          <div className="col-lg-4">
            <div className="admin-stat-card">
              <div className="stat-number">{pesqueiro ? '1' : '0'}</div>
              <div className="stat-label">Pesqueiros vinculados à sua conta</div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="admin-stat-card">
              <div className="stat-number">{totalCamposPreenchidos}/7</div>
              <div className="stat-label">Campos principais preenchidos</div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="admin-stat-card">
              <div className="stat-number">{formData.statusPesqueiro ? 'Ativo' : 'Inativo'}</div>
              <div className="stat-label">Status público</div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-xl-10">
            <div className="card admin-main-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <div>
                    <h3>{pesqueiro ? 'Dados do Pesqueiro' : 'Criar Pesqueiro'}</h3>
                    <p className="text-muted mb-0">
                      Essas informações aparecem para os usuários na tela de pesqueiros disponíveis.
                    </p>
                  </div>
                  {!isEditing && pesqueiro && (
                    <Link className="btn btn-outline-primary" to={`/pesqueiro/${pesqueiro.id}`}>
                      Ver página pública
                    </Link>
                  )}
                </div>

                {isEditing ? (
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Nome do pesqueiro</label>
                      <input
                        className="form-control"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        placeholder="Ex: Pesqueiro Lago Azul"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Telefone</label>
                      <input
                        className="form-control"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Descrição</label>
                      <textarea
                        className="form-control"
                        name="descricao"
                        rows="3"
                        value={formData.descricao}
                        onChange={handleInputChange}
                        placeholder="Conte o que o pesqueiro oferece para os pescadores."
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Informações rápidas</label>
                      <textarea
                        className="form-control"
                        name="informacao"
                        rows="4"
                        value={formData.informacao}
                        onChange={handleInputChange}
                        placeholder={'Horário: 8h às 18h\nServiços: Restaurante, estacionamento e quiosque\nPreço: R$ 25 por pessoa'}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Catálogo de peixes</label>
                      <input
                        className="form-control"
                        name="catalogoPeixes"
                        value={formData.catalogoPeixes}
                        onChange={handleInputChange}
                        placeholder="Pacu, Pintado, Dourado, Tilápia"
                      />
                      <small className="text-muted">Separe os nomes dos peixes por vírgula.</small>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Regras permitidas</label>
                      <textarea
                        className="form-control"
                        name="regrasPermitido"
                        rows="3"
                        value={formData.regrasPermitido}
                        onChange={handleInputChange}
                        placeholder={'Entrada de crianças\nCoolers permitidos\nPesca com carretilha'}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Regras proibidas</label>
                      <textarea
                        className="form-control"
                        name="regrasProibido"
                        rows="3"
                        value={formData.regrasProibido}
                        onChange={handleInputChange}
                        placeholder={'Pesca sem licença\nSom alto após 22h\nFogueiras fora da área'}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">CEP</label>
                      <input className="form-control" name="cep" value={formData.cep} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">Número</label>
                      <input className="form-control" name="numero" value={formData.numero} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Complemento</label>
                      <input
                        className="form-control"
                        name="complemento"
                        value={formData.complemento}
                        onChange={handleInputChange}
                        placeholder="Rua, bairro, ponto de referência..."
                      />
                    </div>

                    <div className="col-12 d-flex gap-2 mt-4">
                      <button className="btn btn-success" onClick={handleSave} disabled={saving}>
                        {saving ? 'Salvando...' : pesqueiro ? 'Salvar alterações' : 'Criar pesqueiro'}
                      </button>
                      {pesqueiro && (
                        <button className="btn btn-secondary" onClick={handleCancel} disabled={saving}>
                          Cancelar
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-md-7">
                      <p><strong>Nome:</strong> {pesqueiro.nome}</p>
                      <p><strong>Telefone:</strong> {pesqueiro.telefone || 'Não informado'}</p>
                      <p><strong>Descrição:</strong> {pesqueiro.descricao || 'Não informada'}</p>
                      <div>
                        <strong>Informações rápidas:</strong>
                        {informacoesRapidas.length > 0 ? (
                          <ul className="mt-2">
                            {informacoesRapidas.map((linha, index) => (
                              <li key={index}>{linha}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mb-0">Nenhuma informação rápida cadastrada.</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-5">
                      <p><strong>CEP:</strong> {pesqueiro.cep || 'Não informado'}</p>
                      <p><strong>Número:</strong> {pesqueiro.numero || 'Não informado'}</p>
                      <p><strong>Complemento:</strong> {pesqueiro.complemento || 'Não informado'}</p>
                      <p><strong>Cadastrado em:</strong> {pesqueiro.dataCadastro || 'Não informado'}</p>
                    </div>
                    <div className="col-12 mt-3">
                      <h5>Catálogo de peixes</h5>
                      {catalogoPeixes.length > 0 ? (
                        <p>{catalogoPeixes.join(', ')}</p>
                      ) : (
                        <p className="mb-0">Nenhum peixe cadastrado ainda.</p>
                      )}
                    </div>
                    <div className="col-md-6 mt-3">
                      <h5>Regras permitidas</h5>
                      {regrasPermitido.length > 0 ? (
                        <ul>
                          {regrasPermitido.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mb-0">Nenhuma regra permitida cadastrada.</p>
                      )}
                    </div>
                    <div className="col-md-6 mt-3">
                      <h5>Regras proibidas</h5>
                      {regrasProibido.length > 0 ? (
                        <ul>
                          {regrasProibido.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mb-0">Nenhuma regra proibida cadastrada.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-4 mb-5">
          <div className="col-xl-10">
            <div className="card admin-main-card">
              <div className="card-body">
                <h3>Cadastro do pesqueiro</h3>
                <p className="text-muted mb-0">
                  Seu pesqueiro está pronto para aparecer como página pública, com catálogo e regras estruturadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
