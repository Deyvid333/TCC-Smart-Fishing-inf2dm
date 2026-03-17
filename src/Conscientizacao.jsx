// ========== IMPORTAÇÕES ==========
// Importa React (sem hooks pois é um componente estático)
import React from 'react';
// Importa componente de navegação
import Navbar from './Componentes/Navbar/Navbar';
// Importa estilos CSS
import './App.css';

// ========== COMPONENTE DE CONSCIENTIZAÇÃO AMBIENTAL ==========
function Conscientizacao() {
  // ========== DADOS DOS PEIXES AMEAÇADOS ==========
  // Array com informações de espécies em risco de extinção (dados fictícios para demonstração)
  const peixesExtincao = [
    { nome: 'Surubim do São Francisco', status: 'Criticamente Ameaçado', causa: 'Poluição e barragens no Rio São Francisco', icon: '' },
    { nome: 'Dourado', status: 'Vulnerável', causa: 'Sobrepesca e degradação do habitat', icon: '' },
    { nome: 'Pintado', status: 'Quase Ameaçado', causa: 'Poluição industrial e desmatamento', icon: '' },
    { nome: 'Piracanjuba', status: 'Em Perigo', causa: 'Construção de hidrelétricas', icon: '' },
    { nome: 'Pirarucu', status: 'Vulnerável', causa: 'Sobrepesca na Amazônia', icon: '' },
    { nome: 'Cachara', status: 'Quase Ameaçado', causa: 'Poluição do Pantanal', icon: '' },
    { nome: 'Jatuarana', status: 'Em Perigo', causa: 'Barragens no Rio Tocantins', icon: '' },
    { nome: 'Curimatã', status: 'Vulnerável', causa: 'Assoreamento dos rios', icon: '' },
    { nome: 'Pacambá', status: 'Criticamente Ameaçado', causa: 'Perda de habitat reprodutivo', icon: '' },
    { nome: 'Surubim Pintado', status: 'Em Perigo', causa: 'Pesca predatória', icon: '' },
    { nome: 'Barbado', status: 'Vulnerável', causa: 'Poluição química', icon: '' },
    { nome: 'Piapara', status: 'Quase Ameaçado', causa: 'Fragmentação de habitat', icon: '' },
    { nome: 'Matrinxã', status: 'Em Perigo', causa: 'Sobrepesca comercial', icon: '' },
    { nome: 'Pacu-Caranha', status: 'Vulnerável', causa: 'Degradação de várzeas', icon: '' },
    { nome: 'Piranha-Preta', status: 'Quase Ameaçado', causa: 'Alteração do pH da água', icon: '' },
    { nome: 'Tucunaré-Açu', status: 'Em Perigo', causa: 'Introdução de espécies exóticas', icon: '' },
    { nome: 'Lambari-do-Rabo-Amarelo', status: 'Vulnerável', causa: 'Poluição urbana', icon: '' },
    { nome: 'Cascudo-Preto', status: 'Criticamente Ameaçado', causa: 'Mineração em rios', icon: '' },
    { nome: 'Mandi-Pintado', status: 'Em Perigo', causa: 'Sedimentação excessiva', icon: '' },
    { nome: 'Piava', status: 'Vulnerável', causa: 'Canalización de ríos', icon: '' },
    { nome: 'Salminus', status: 'Quase Ameaçado', causa: 'Fragmentação por barragens', icon: '' },
    { nome: 'Brycon', status: 'Em Perigo', causa: 'Perda de corredores migratórios', icon: '' },
    { nome: 'Leporinus', status: 'Vulnerável', causa: 'Poluição agrícola', icon: '' },
    { nome: 'Prochilodus', status: 'Criticamente Ameaçado', causa: 'Sobrepesca durante reprodução', icon: '' },
    { nome: 'Pseudoplatystoma', status: 'Em Perigo', causa: 'Captura de juvenis', icon: '' },
    { nome: 'Colossoma', status: 'Vulnerável', causa: 'Desmatamento da Amazônia', icon: '' },
    { nome: 'Mylossoma', status: 'Quase Ameaçado', causa: 'Alteração do ciclo das águas', icon: '' },
    { nome: 'Serrasalmus', status: 'Em Perigo', causa: 'Poluição por metais pesados', icon: '' },
    { nome: 'Astronotus', status: 'Vulnerável', causa: 'Degradação de manguezais', icon: '' },
    { nome: 'Cichla', status: 'Criticamente Ameaçado', causa: 'Aquecimento global das águas', icon: '' }
  ];

  // ========== DADOS DE AÇÕES SUSTENTÁVEIS ==========
  // Array com sugestões de práticas responsáveis para pescadores
  const acoesSustentaveis = [
    {
      titulo: 'Pesque com Responsabilidade',
      descricao: 'Respeite os períodos de defeso e tamanhos mínimos',
      icon: '',
      dicas: ['Solte peixes pequenos', 'Respeite cotas de captura', 'Use anzóis sem farpa']
    },
    {
      titulo: 'Não Polua as Águas',
      descricao: 'Mantenha rios e lagos limpos para as futuras gerações',
      icon: '',
      dicas: ['Não jogue lixo na água', 'Use produtos biodegradáveis', 'Recolha seu lixo']
    },
    {
      titulo: 'Preserve a Vegetação',
      descricao: 'Mata ciliar protege os peixes e a qualidade da água',
      icon: '',
      dicas: ['Não desmatar margens', 'Plante árvores nativas', 'Denuncie desmatamento']
    },
    {
      titulo: 'Eduque Outros Pescadores',
      descricao: 'Compartilhe conhecimento sobre pesca sustentável',
      icon: '',
      dicas: ['Ensine boas práticas', 'Compartilhe informações', 'Seja exemplo']
    }
  ];

  // ========== RENDERIZAÇÃO DO COMPONENTE ==========
  return (
    <>
      {/* Componente de navegação fixo */}
      <Navbar />
      
      {/* Container principal com margem para navbar */}
      <div className="user-page-content">
        <div className="container mt-4">
          
          {/* ========== CABEÇALHO DA PÁGINA ========== */}
          <div className="text-center mb-5">
            <h1 className="hero-title" style={{color: '#112D4E', fontSize: '3rem'}}>
              Conscientização Ambiental
            </h1>
            <p className="hero-subtitle" style={{color: '#3F72AF', fontSize: '1.3rem'}}>
              Protegendo nossos rios e peixes para as futuras gerações
            </p>
            
            {/* Aviso sobre dados fictícios */}
            <div className="alert alert-info mt-4">
              <small>
                <strong>Aviso:</strong> Os dados apresentados nesta página são fictícios e foram criados 
                para fins educacionais e demonstração do sistema. Para informações reais sobre 
                conservação aquática, consulte órgãos oficiais como IBAMA, ICMBio e institutos de pesquisa.
              </small>
            </div>
          </div>

          {/* ========== SEÇÃO PRINCIPAL: PEIXES AMEAÇADOS E PROBLEMAS ========== */}
          <div className="row mb-5">
            
            {/* ========== COLUNA: PEIXES EM EXTINÇÃO ========== */}
            <div className="col-md-6">
              <div className="card admin-main-card">
                <div className="card-body">
                  <h3 className="mb-4">Peixes Ameaçados de Extinção</h3>
                  <p className="text-muted mb-4">
                    Conheça algumas espécies brasileiras que correm risco de desaparecer:
                  </p>
                  
                  {/* Lista scrollável de peixes ameaçados */}
                  <div style={{maxHeight: '400px', overflowY: 'auto'}}>
                    {/* Mapeia cada peixe para criar um item da lista */}
                    {peixesExtincao.map((peixe, index) => (
                      <div key={index} className="mb-2 p-2 border rounded" style={{borderLeft: '3px solid #e74c3c'}}>
                        <div className="d-flex align-items-center mb-1">
                          <span className="me-2">{peixe.icon}</span>
                          <h6 className="mb-0 small">{peixe.nome}</h6>
                        </div>
                        <div className="small">
                          <span className={`badge ${peixe.status === 'Criticamente Ameaçado' ? 'bg-danger' : peixe.status === 'Em Perigo' ? 'bg-warning' : 'bg-secondary'} mb-1`} style={{fontSize: '0.7rem'}}>
                            {peixe.status}
                          </span>
                          <p className="mb-0 text-muted" style={{fontSize: '0.8rem'}}>{peixe.causa}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="alert alert-danger mt-4">
                    <h6>Dados Alarmantes:</h6>
                    <ul className="mb-0 small">
                      <li><strong>68%</strong> dos peixes de água doce estão ameaçados no Brasil</li>
                      <li><strong>25%</strong> da biodiversidade aquática perdida em 30 anos</li>
                      <li><strong>80%</strong> dos rios brasileiros sofrem com poluição</li>
                      <li><strong>15 espécies</strong> já foram extintas na última década</li>
                      <li><strong>200 mil toneladas</strong> de peixe capturadas ilegalmente por ano</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* ========== COLUNA: PRINCIPAIS PROBLEMAS ========== */}
            <div className="col-md-6">
              <div className="card admin-main-card">
                <div className="card-body">
                  <h3 className="mb-4">Principais Problemas</h3>
                  
                  <div className="mb-4">
                    <div className="mb-3 p-3 border rounded" style={{borderLeft: '4px solid #f39c12'}}>
                      <h6>Poluição Industrial</h6>
                      <p className="small mb-2">Químicos tóxicos matam peixes e contaminam a cadeia alimentar</p>
                      <ul className="small mb-0 text-muted">
                        <li><strong>Metais pesados:</strong> Mercúrio, chumbo e cádmio causam deformidades</li>
                        <li><strong>Pesticidas:</strong> 500 mil toneladas/ano contaminam rios brasileiros</li>
                        <li><strong>Efluentes:</strong> 70% das indústrias despejam sem tratamento</li>
                      </ul>
                    </div>
                    
                    <div className="mb-3 p-3 border rounded" style={{borderLeft: '4px solid #e67e22'}}>
                      <h6>Lixo e Plásticos</h6>
                      <p className="small mb-2">Resíduos sólidos sufocam animais aquáticos e poluem habitats</p>
                      <ul className="small mb-0 text-muted">
                        <li><strong>Microplásticos:</strong> Encontrados em 90% dos peixes analisados</li>
                        <li><strong>Redes fantasma:</strong> 640 mil toneladas abandonadas nos oceanos</li>
                        <li><strong>Tempo de decomposição:</strong> Plástico leva até 500 anos</li>
                      </ul>
                    </div>
                    
                    <div className="mb-3 p-3 border rounded" style={{borderLeft: '4px solid #8e44ad'}}>
                      <h6>Desmatamento</h6>
                      <p className="small mb-2">Destruição da mata ciliar causa erosão e assoreamento</p>
                      <ul className="small mb-0 text-muted">
                        <li><strong>Mata ciliar:</strong> 80% já foi destruída no Brasil</li>
                        <li><strong>Assoreamento:</strong> Reduz profundidade em 30cm/ano</li>
                        <li><strong>Temperatura:</strong> Água aquece 5°C sem vegetação</li>
                      </ul>
                    </div>
                    
                    <div className="mb-3 p-3 border rounded" style={{borderLeft: '4px solid #c0392b'}}>
                      <h6>Sobrepesca</h6>
                      <p className="small mb-2">Captura excessiva impede reprodução das espécies</p>
                      <ul className="small mb-0 text-muted">
                        <li><strong>Pesca ilegal:</strong> 30% de toda captura no Brasil</li>
                        <li><strong>Juvenis capturados:</strong> 60% dos peixes são muito jovens</li>
                        <li><strong>Defeso ignorado:</strong> Pesca durante reprodução mata futuras gerações</li>
                        <li><strong>Equipamentos proibidos:</strong> Redes de malha fina capturam tudo</li>
                      </ul>
                    </div>
                  </div>

                  <div className="alert alert-info">
                    <h6>Fatos Chocantes:</h6>
                    <ul className="small mb-0">
                      <li><strong>1 litro de óleo</strong> contamina 1 milhão de litros de água</li>
                      <li><strong>1 pilha</strong> polui 400 mil litros de água por 50 anos</li>
                      <li><strong>Pesca com explosivos</strong> mata 80% da vida aquática local</li>
                      <li><strong>Esgoto doméstico</strong> reduz oxigênio em 90% nos rios</li>
                      <li><strong>Aquecimento global</strong> aumenta temperatura da água em 2°C/década</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========== SEÇÃO DETALHADA: SOBREPESCA ========== */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="card admin-main-card">
                <div className="card-body">
                  <h3 className="text-center mb-4">Sobrepesca: O Maior Inimigo dos Peixes</h3>
                  
                  <div className="row">
                    <div className="col-md-6">
                      <h5 className="mb-3">Práticas Destrutivas</h5>
                      <div className="mb-3 p-3 border rounded" style={{background: '#fff3cd'}}>
                        <h6>Redes de Arrasto</h6>
                        <p className="small mb-1">Capturam tudo no caminho, incluindo espécies não-alvo</p>
                        <span className="badge bg-danger small">Mortalidade: 95%</span>
                      </div>
                      
                      <div className="mb-3 p-3 border rounded" style={{background: '#fff3cd'}}>
                        <h6>Pesca com Veneno</h6>
                        <p className="small mb-1">Uso de substancias tóxicas mata toda vida aquática</p>
                        <span className="badge bg-danger small">Recuperação: 10+ anos</span>
                      </div>
                      
                      <div className="mb-3 p-3 border rounded" style={{background: '#fff3cd'}}>
                        <h6>Pesca com Explosivos</h6>
                        <p className="small mb-1">Destrói recifes e mata peixes em área extensa</p>
                        <span className="badge bg-danger small">Dano: Permanente</span>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <h5 className="mb-3">Consequências</h5>
                      <div className="mb-3 p-3 border rounded" style={{background: '#f8d7da'}}>
                        <h6>Colapso Populacional</h6>
                        <ul className="small mb-0">
                          <li>Redução de 90% em algumas espécies</li>
                          <li>Interrupção do ciclo reprodutivo</li>
                          <li>Perda de diversidade genética</li>
                        </ul>
                      </div>
                      
                      <div className="mb-3 p-3 border rounded" style={{background: '#f8d7da'}}>
                        <h6>Desequilíbrio Ecológico</h6>
                        <ul className="small mb-0">
                          <li>Superpopulação de espécies menores</li>
                          <li>Alteração da cadeia alimentar</li>
                          <li>Proliferação de algas nocivas</li>
                        </ul>
                      </div>
                      
                      <div className="mb-3 p-3 border rounded" style={{background: '#f8d7da'}}>
                        <h6>Impacto Econômico</h6>
                        <ul className="small mb-0">
                          <li>Perda de R$ 2 bilhões/ano no Brasil</li>
                          <li>Desemprego de 500 mil pescadores</li>
                          <li>Redução do turismo pesqueiro</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="alert alert-warning mt-4">
                    <h6>Tempo de Recuperação das Espécies:</h6>
                    <div className="row small">
                      <div className="col-md-3"><strong>Lambari:</strong> 1-2 anos</div>
                      <div className="col-md-3"><strong>Tilápia:</strong> 3-5 anos</div>
                      <div className="col-md-3"><strong>Dourado:</strong> 8-12 anos</div>
                      <div className="col-md-3"><strong>Surubim:</strong> 15-20 anos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========== SEÇÃO: AÇÕES SUSTENTÁVEIS ========== */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="card admin-main-card">
                <div className="card-body">
                  <h3 className="text-center mb-4">Como Você Pode Ajudar</h3>
                  <p className="text-center text-muted mb-5">
                    Pequenas ações fazem grande diferença na preservação dos nossos recursos aquáticos
                  </p>
                  
                  <div className="row">
                    {/* Mapeia cada ação sustentável para criar um card */}
                    {acoesSustentaveis.map((acao, index) => (
                      <div key={index} className="col-md-6 mb-4">
                        <div className="h-100 p-4 border rounded" style={{background: 'linear-gradient(145deg, #F9F7F7, #DBE2EF)'}}>
                          <div className="text-center mb-3">
                            <span style={{fontSize: '3rem'}}>{acao.icon}</span>
                            <h5 className="mt-2">{acao.titulo}</h5>
                            <p className="text-muted">{acao.descricao}</p>
                          </div>
                          <ul className="list-unstyled">
                            {acao.dicas.map((dica, i) => (
                              <li key={i} className="mb-2">
                                <span className="text-success me-2">+</span>
                                <small>{dica}</small>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========== SEÇÃO: CALL TO ACTION (CHAMADA PARA AÇÃO) ========== */}
          <div className="row mb-5">
            <div className="col-12">
              {/* Card com gradiente e botões de ação */}
              <div className="text-center p-5" style={{background: 'linear-gradient(135deg, #3F72AF, #112D4E)', borderRadius: '20px', color: '#F9F7F7'}}>
                <h3 className="mb-3">Junte-se ao Movimento</h3>
                <p className="mb-4">
                  Seja um pescador consciente e ajude a preservar a biodiversidade aquática brasileira. 
                  Cada ação conta para garantir que as próximas gerações também possam desfrutar da pesca.
                </p>
                
                {/* Botões de ação (apenas visuais - não funcionais) */}
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <button className="btn btn-light btn-lg">Denunciar Poluição</button>
                  <button className="btn btn-outline-light btn-lg">Participar de Ações</button>
                  <button className="btn btn-outline-light btn-lg">Saber Mais</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ========== EXPORTAÇÃO DO COMPONENTE ==========
export default Conscientizacao;