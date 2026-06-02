import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from './Componentes/Navbar/Navbar';
import PesqueiroService from './services/PesqueiroService';
import fallbackImage from './assets/imagensPeixes/pesqueiro.png';
import './App.css';

const samplePesqueirosMap = {
  'sample-1': {
    id: 'sample-1',
    nome: 'Pesqueiro Lago Azul',
    telefone: '(11) 99876-5432',
    descricao: 'Pesqueiro familiar com estrutura completa e clima tranquilo para toda a família.',
    informacao: JSON.stringify({
      detalhamento: 'Horário: 8h às 19h\nServiços: Restaurante, quiosques e estacionamento',
      catalogoPeixes: ['Pacu', 'Pintado', 'Tilápia', 'Dourado'],
      regrasPermitido: ['Entrada de crianças acompanhadas', 'Cooler e lanches próprios', 'Pesca com equipamento próprio'],
      regrasProibido: ['Pesca noturna fora do horário', 'Som alto após 22h', 'Lixo nas margens'],
    }),
    cep: '01234-567',
    numero: '128',
    complemento: 'Rua das Traíras, junto ao lago',
    statusPesqueiro: true,
  },
  'sample-2': {
    id: 'sample-2',
    nome: 'Pesqueiro Terra Serena',
    telefone: '(11) 98765-4321',
    descricao: 'Local cercado por natureza, ideal para pescaria com amigos e descanso à beira d’água.',
    informacao: JSON.stringify({
      detalhamento: 'Horário: 7h às 20h\nServiços: Quiosques e lanchonete',
      catalogoPeixes: ['Carpa', 'Tambaqui', 'Pintado'],
      regrasPermitido: ['Entrada de famílias', 'Uso de isca artificial', 'Estacionamento gratuito'],
      regrasProibido: ['Acampamento livre', 'Fogueiras próximas ao lago', 'Pesca com redes grandes'],
    }),
    cep: '02345-678',
    numero: '210',
    complemento: 'Avenida dos Pescadores',
    statusPesqueiro: true,
  },
  'sample-3': {
    id: 'sample-3',
    nome: 'Pesqueiro Pedra Dourada',
    telefone: '(11) 96543-2109',
    descricao: 'Pesqueiro rústico com ótimas atrações para quem quer pescar e relaxar em um ambiente natural.',
    informacao: JSON.stringify({
      detalhamento: 'Horário: 9h às 18h\nServiços: Estrutura de churrasco e passeio de barco',
      catalogoPeixes: ['Bicuda', 'Piau', 'Tilápia'],
      regrasPermitido: ['Pesca com anzol simples', 'Entrada de crianças', 'Uso de cooler pessoal'],
      regrasProibido: ['Ruído excessivo', 'Uso de explosivos', 'Despejo de lixo na água'],
    }),
    cep: '03456-789',
    numero: '56',
    complemento: 'Estrada do Mirante',
    statusPesqueiro: true,
  },
};

function Pesqueiro() {
  const { id } = useParams();
  const [pesqueiro, setPesqueiro] = useState(id ? null : samplePesqueirosMap['sample-1']);
  const [loading, setLoading] = useState(Boolean(id));
  const [erro, setErro] = useState('');

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

  useEffect(() => {
    if (!id) return;

    if (samplePesqueirosMap[id]) {
      setPesqueiro(samplePesqueirosMap[id]);
      setLoading(false);
      return;
    }

    const carregarPesqueiro = async () => {
      try {
        const response = await PesqueiroService.findById(id);
        setPesqueiro(response.data);
      } catch (error) {
        setErro('Pesqueiro não encontrado.');
      } finally {
        setLoading(false);
      }
    };

    carregarPesqueiro();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mt-5">
          <p>Carregando pesqueiro...</p>
        </div>
      </>
    );
  }

  if (erro || !pesqueiro) {
    return (
      <>
        <Navbar />
        <div className="container mt-5">
          <div className="alert alert-danger">{erro || 'Pesqueiro não encontrado.'}</div>
          <Link to="/pesqueiros" className="btn btn-primary">Voltar para pesqueiros</Link>
        </div>
      </>
    );
  }

  const infoData = parseInformacao(pesqueiro.informacao || '');
  const informacoes = (infoData?.detalhamento || '')
    .split('\n')
    .map((linha) => linha.trim())
    .filter(Boolean);
  const catalogoPeixes = infoData?.catalogoPeixes || [];
  const regrasPermitido = infoData?.regrasPermitido || [];
  const regrasProibido = infoData?.regrasProibido || [];

  const comentarios = pesqueiro.comentarios || [
    { id: 1, nome: 'Marcos', texto: 'Ambiente excelente e peixes bons. Recomendo para quem quer relaxar.', data: 'há 2 dias' },
    { id: 2, nome: 'Ana', texto: 'Muito bem organizado e com ótimo atendimento. Voltaria sempre.', data: 'há 1 semana' },
    { id: 3, nome: 'Lucas', texto: 'Estrutura legal e boa variedade de peixes. Família aprovou.', data: 'há 3 semanas' },
  ];

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h1 className="text-center mb-4 text-white">{pesqueiro.nome}</h1>

        <div className="info-section mb-5">
          <div className="card info-card">
            <img
              src={fallbackImage}
              alt={pesqueiro.nome}
              style={{ width: '100%', borderRadius: '20px', maxHeight: '420px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <div className="row">
                <div className="col-lg-7">
                  <h2 className="info-title">Sobre o Pesqueiro</h2>
                  <p className="info-description">
                    {pesqueiro.descricao || 'Este pesqueiro ainda não cadastrou uma descrição.'}
                  </p>
                  {pesqueiro.complemento && (
                    <p className="info-highlight">{pesqueiro.complemento}</p>
                  )}
                </div>

                <div className="col-lg-5">
                  <div className="info-details mb-4">
                    <h5 className="mb-3">Informações Rápidas</h5>
                    <div className="detail-row">
                      <span><strong>Telefone:</strong> {pesqueiro.telefone || 'Não informado'}</span>
                    </div>
                    <div className="detail-row">
                      <span>
                        <strong>Endereço:</strong> CEP {pesqueiro.cep || 'não informado'}
                        {pesqueiro.numero ? `, nº ${pesqueiro.numero}` : ''}
                      </span>
                    </div>
                    {informacoes.map((linha) => (
                      <div className="detail-row" key={linha}>
                        <span>{linha}</span>
                      </div>
                    ))}
                  </div>

                  <div className="rules-section mb-4">
                    <h4 className="rules-title">Regras do Pesqueiro</h4>
                    <div className="row">
                      <div className="col-12 mb-3">
                        <div className="rules-allowed">
                          <h6>Permitido</h6>
                          <ul>
                            {regrasPermitido.length > 0 ? (
                              regrasPermitido.map((item, index) => <li key={index}>{item}</li>)
                            ) : (
                              <li>Regulamentos serão adicionados pelo dono do pesqueiro.</li>
                            )}
                          </ul>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="rules-forbidden">
                          <h6>Proibido</h6>
                          <ul>
                            {regrasProibido.length > 0 ? (
                              regrasProibido.map((item, index) => <li key={index}>{item}</li>)
                            ) : (
                              <li>Informações de proibições serão adicionadas em breve.</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-body">
                      <h5 className="mb-3">Catálogo de Peixes</h5>
                      {catalogoPeixes.length > 0 ? (
                        <div className="row g-2">
                          {catalogoPeixes.map((peixe) => (
                            <div key={peixe} className="col-6">
                              <div className="fish-status-item">{peixe}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted mb-0">Nenhum peixe cadastrado ainda. O dono do pesqueiro pode atualizar em breve.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="comments-section mb-5">
          <div className="card">
            <div className="card-body">
              <h3 className="mb-4">Comentários</h3>
              {comentarios.map((comment) => (
                <div key={comment.id} className="comment-item mb-3">
                  <div className="comment-header d-flex justify-content-between align-items-center mb-2">
                    <strong>{comment.nome}</strong>
                    <small className="text-muted">{comment.data}</small>
                  </div>
                  <p className="comment-text mb-0">{comment.texto}</p>
                </div>
              ))}
              {comentarios.length === 0 && <p className="text-muted">Nenhum comentário disponível.</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pesqueiro;
