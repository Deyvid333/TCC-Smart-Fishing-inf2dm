import React, { useState } from 'react';
import Navbar from './Componentes/Navbar/Navbar';
import pesqueiro3 from './assets/pesqueiro3.png';
import bagre from './assets/bagre-africano.webp';
import tambaqui from './assets/Tambaqui.jpg';
import carpa from './assets/Carpa.jpg';
import './App.css';
import pesqueiroImg10 from './assets/pesqueiro10.jpg';
import pesqueiroImg11 from './assets/pesqueiro11.jpg';
import pesqueiroImg12 from './assets/pesqueiro12.jpg';

function Pesqueiro3() {
  const [comments, setComments] = useState([
    {
      id: 1,
      nome: 'Pedro Santos',
      rating: 5,
      texto: 'Melhor pesqueiro 24h da região! Pesca noturna incrível, peguei vários bagres grandes. Preço justo!',
      data: 'há 1 dia'
    },
    {
      id: 2,
      nome: 'Lucia Ferreira',
      rating: 4,
      texto: 'Lugar tradicional e acolhedor. Sempre tem peixe! O pessoal é muito simpático e prestativo.',
      data: 'há 4 dias'
    },
    {
      id: 3,
      nome: 'Marcos Oliveira',
      rating: 5,
      texto: 'Venho aqui há anos! Nunca decepciona. Tambaquis enormes e carpas briguentas. Recomendo demais!',
      data: 'há 1 semana'
    }
  ]);

  const [selectedFish, setSelectedFish] = useState(null);
  const [showFishInfo, setShowFishInfo] = useState(false);
  const [currentFishIndex, setCurrentFishIndex] = useState(0);

  const peixes = [
    { nome: 'Bagre-Africano', horario: '20:00 - 4:00', tamanho: '40-80cm', dificuldade: 'Fácil', consumo: 'Seguro', iscas: 'Pedaços de frango, fígado', obs: 'Espécie exótica, muito resistente', extincao: false },
    { nome: 'Carpa-Capim', horario: '5:00 - 8:00, 17:00 - 20:00', tamanho: '50-100cm', dificuldade: 'Difícil', consumo: 'Seguro', iscas: 'Capim, algas, vegetação', obs: 'Vegetariana, muito grande', extincao: false },
    { nome: 'Tucunaré-Açu', horario: '6:00 - 10:00, 16:00 - 19:00', tamanho: '35-70cm', dificuldade: 'Difícil', consumo: 'Seguro', iscas: 'Iscas artificiais, peixe vivo', obs: 'Predador voraz, pesca esportiva', extincao: true },
    { nome: 'Apaiari', horario: '7:00 - 11:00, 15:00 - 18:00', tamanho: '25-45cm', dificuldade: 'Médio', consumo: 'Seguro', iscas: 'Camarão, minhoca, massa', obs: 'Carne firme, muito saboroso', extincao: false },
    { nome: 'Piranha-Vermelha', horario: '12:00 - 16:00', tamanho: '15-30cm', dificuldade: 'Médio', consumo: 'Cuidado', iscas: 'Carne, peixe, sangue', obs: 'Dentes afiados, cuidado ao manusear', extincao: false },
    { nome: 'Cascudo-Preto', horario: '21:00 - 2:00', tamanho: '25-40cm', dificuldade: 'Fácil', consumo: 'Seguro', iscas: 'Minhoca, ração, resto de comida', obs: 'Limpador natural do lago', extincao: true },
    { nome: 'Pirá-Braço', horario: '14:00 - 18:00', tamanho: '20-35cm', dificuldade: 'Médio', consumo: 'Seguro', iscas: 'Frutas pequenas, sementes', obs: 'Nadadeiras avermelhadas', extincao: false },
    { nome: 'Armau', horario: '16:00 - 22:00', tamanho: '30-60cm', dificuldade: 'Médio', consumo: 'Seguro', iscas: 'Peixe pequeno, camarão', obs: 'Predador noturno, dentes afiados', extincao: false },
    { nome: 'Curimatã-Pacu', horario: '8:00 - 12:00, 14:00 - 17:00', tamanho: '18-30cm', dificuldade: 'Fácil', consumo: 'Seguro', iscas: 'Milho, massa, minhoca', obs: 'Cardume numeroso, fácil captura', extincao: false },
    { nome: 'Sará-Flamengo', horario: '9:00 - 15:00', tamanho: '12-25cm', dificuldade: 'Fácil', consumo: 'Seguro', iscas: 'Minhoca pequena, massa', obs: 'Colorido, ideal para crianças', extincao: false },
    { nome: 'Mandi-Guaru', horario: '18:00 - 24:00', tamanho: '25-45cm', dificuldade: 'Médio', consumo: 'Seguro', iscas: 'Minhoca grande, pedaços de peixe', obs: 'Bagre nativo, carne saborosa', extincao: false },
    { nome: 'Peixe-Cachorro', horario: '11:00 - 16:00', tamanho: '40-80cm', dificuldade: 'Difícil', consumo: 'Seguro', iscas: 'Peixe vivo, iscas artificiais', obs: 'Predador feroz, dentes caninos', extincao: true }
  ];

  const handleFishClick = (peixe) => {
    setSelectedFish(peixe);
    setShowFishInfo(true);
  };

  const [newComment, setNewComment] = useState({
    nome: '',
    rating: 5,
    texto: ''
  });

  const handleInputChange = (e) => {
    setNewComment({
      ...newComment,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingClick = (rating) => {
    setNewComment({
      ...newComment,
      rating: rating
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.nome.trim() && newComment.texto.trim()) {
      const comment = {
        id: comments.length + 1,
        nome: newComment.nome,
        rating: newComment.rating,
        texto: newComment.texto,
        data: 'agora'
      };
      setComments([comment, ...comments]);
      setNewComment({ nome: '', rating: 5, texto: '' });
      alert('Comentário enviado com sucesso!');
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  };

  const renderStars = (rating, interactive = false) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index}
        className={`star ${interactive ? 'interactive' : ''} ${index < rating ? 'filled' : ''}`}
        onClick={interactive ? () => handleRatingClick(index + 1) : undefined}
      >
        ⭐
      </span>
    ));
  };

  const calculateAverageRating = () => {
    if (comments.length === 0) return 0;
    const sum = comments.reduce((acc, comment) => acc + comment.rating, 0);
    return (sum / comments.length).toFixed(1);
  };

  return (
    <>
      <Navbar />

    <div className="container mt-4">
      <h1 className="text-center mb-4 text-white">🎣 Lago da Rocha do Norte</h1>
      
      {/* Seção de Informações do Pesqueiro */}
      <div className="info-section mb-5">
        <div className="card info-card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                <h2 className="info-title">🎣 Pesqueiro Lago da Rocha do Norte</h2>
                <p className="info-description">
                  O mais tradicional da região, o Pesqueiro Lago da Rocha do Norte nunca dorme! Aberto 24 horas por dia,
                  é o destino ideal para pescadores noturnos ou para quem gosta de curtir a natureza a qualquer hora.
                  Simples, mas muito funcional, o espaço conta com quiosques e estacionamento gratuito.
                </p>
                <p className="info-highlight">
                  Um lugar acolhedor que carrega histórias e memórias de gerações!
                </p>
              </div>
              <div className="col-md-4">
                <div className="info-details">
                  <h5 className="mb-3">📊 Informações Rápidas</h5>
                  <div className="detail-row">
                    <span className="detail-icon">🕐</span>
                    <span><strong>Horário:</strong> Aberto 24h</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">💰</span>
                    <span><strong>Preço:</strong> R$15 por dia</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">📏</span>
                    <span><strong>Área:</strong> 22.000 m²</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🌊</span>
                    <span><strong>Profundidade:</strong> 4,1m (média)</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🏠</span>
                    <span><strong>Quiosques:</strong> 12 unidades</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🍽️</span>
                    <span><strong>Serviços:</strong> Quiosques, lanchonete</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🏎️</span>
                    <span><strong>Estacionamento:</strong> Gratuito (80 vagas)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Seção de Regras */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="rules-section">
                <h4 className="rules-title">📜 Regras do Pesqueiro</h4>
                <div className="row">
                  <div className="col-md-6">
                    <div className="rules-allowed">
                      <h6>✅ Permitido:</h6>
                      <ul>
                        <li>Pesca 24 horas por dia</li>
                        <li>Entrada de crianças e idosos</li>
                        <li>Coolers e bebidas próprias</li>
                        <li>Equipamentos de pesca noturna</li>
                        <li>Acampamento em áreas designadas</li>
                        <li>Fogueiras controladas</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="rules-forbidden">
                      <h6>❌ Proibido:</h6>
                      <ul>
                        <li>Pescar sem camisa</li>
                        <li>Entrada de pets/animais</li>
                        <li>Som alto após 22h</li>
                        <li>Pesca com redes grandes</li>
                        <li>Deixar lixo no local</li>
                        <li>Consumo excessivo de álcool</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-center mb-5">🐟 Peixes Disponíveis</h2>

      {/* Carrossel de Peixes */}
      <div className="fish-carousel mb-5">
        <div className="text-center mb-3">
          <button 
            onClick={() => setCurrentFishIndex(Math.max(0, currentFishIndex - 5))}
            disabled={currentFishIndex === 0}
            className="btn btn-outline-primary me-2"
          >
            ← Anterior
          </button>
          <span className="mx-3 text-muted">Grupo {Math.floor(currentFishIndex / 5) + 1} de {Math.ceil(peixes.length / 5)}</span>
          <button 
            onClick={() => setCurrentFishIndex(Math.min(Math.floor((peixes.length - 1) / 5) * 5, currentFishIndex + 5))}
            disabled={currentFishIndex + 5 >= peixes.length}
            className="btn btn-outline-primary ms-2"
          >
            Próximo →
          </button>
        </div>
        
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          {peixes.slice(currentFishIndex, currentFishIndex + 5).map((peixe, index) => (
            <div 
              key={currentFishIndex + index}
              className="fish-card-small" 
              onClick={() => handleFishClick(peixe)}
              style={{
                width: '180px',
                height: '140px',
                background: 'linear-gradient(45deg, #3F72AF, #112D4E)',
                borderRadius: '15px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F9F7F7',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(63, 114, 175, 0.3)',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(63, 114, 175, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(63, 114, 175, 0.3)';
              }}
            >
              <div style={{fontSize: '3rem', marginBottom: '10px'}}>🐟</div>
              <div style={{fontSize: '1rem', fontWeight: '600', textAlign: 'center', padding: '0 10px'}}>{peixe.nome}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup de Informações do Peixe */}
      {showFishInfo && selectedFish && (
        <div 
          className="fish-info-popup" 
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#F9F7F7',
            border: '2px solid #DBE2EF',
            borderRadius: '20px',
            padding: '30px',
            zIndex: 1000,
            boxShadow: '0 15px 35px rgba(17, 45, 78, 0.2)',
            maxWidth: '500px',
            width: '90%'
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 style={{color: '#112D4E', margin: 0}}>🐟 {selectedFish.nome}</h4>
            <button 
              onClick={() => setShowFishInfo(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#112D4E'
              }}
            >
              ×
            </button>
          </div>
          <div style={{color: '#3F72AF'}}>
            {selectedFish.extincao && (
              <div className="alert alert-warning mb-3" style={{fontSize: '0.9rem'}}>
                <strong>⚠️ Espécie em Risco de Extinção!</strong>
                <br />
                <small>Esta espécie precisa de proteção. Pratique pesca sustentável.</small>
                <br />
                <a href="/conscientizacao" className="btn btn-sm btn-outline-warning mt-2">
                  🌍 Saiba Mais sobre Conservação
                </a>
              </div>
            )}
            <p><strong>🕐 Melhor horário:</strong> {selectedFish.horario}</p>
            <p><strong>📏 Tamanho médio:</strong> {selectedFish.tamanho}</p>
            <p><strong>🎯 Dificuldade:</strong> <span className={`badge ${selectedFish.dificuldade === 'Fácil' ? 'bg-success' : selectedFish.dificuldade === 'Médio' ? 'bg-warning' : 'bg-danger'}`}>{selectedFish.dificuldade}</span></p>
            <p><strong>🍽️ Consumo:</strong> <span className={`badge ${selectedFish.consumo === 'Seguro' ? 'bg-success' : 'bg-warning'}`}>{selectedFish.consumo}</span></p>
            <p><strong>🎣 Iscas recomendadas:</strong> {selectedFish.iscas}</p>
            <p><strong>📝 Observações:</strong> {selectedFish.obs}</p>
          </div>
        </div>
      )}

      {/* Overlay do Popup */}
      {showFishInfo && (
        <div 
          onClick={() => setShowFishInfo(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
          }}
        ></div>
      )}

      <div className="row g-4 mb-5" style={{display: 'none'}}>
        <div className="col-lg-4 col-md-6">
          <div className="card fish-card h-100">
            <div className="card-header text-center" style={{background: 'linear-gradient(45deg, #3F72AF, #112D4E)', color: '#F9F7F7'}}>
              <h4 className="mb-0">🐟 Bagre</h4>
            </div>
            <div className="card-body">
              <div className="fish-info mb-3">
                <p><strong>🕐 Melhor horário:</strong> 18:00 - 2:00</p>
                <p><strong>📏 Tamanho médio:</strong> 30-70cm</p>
                <p><strong>🎯 Dificuldade:</strong> <span className="badge bg-success">Fácil</span></p>
                <p><strong>🍽️ Consumo:</strong> <span className="badge bg-warning">⚠️ Cuidado</span></p>
              </div>
              <p className="card-text"><strong>🎣 Iscas recomendadas:</strong> Pedaços de peixe, carne</p>
              <p className="card-text text-warning"><strong>ATENÇÃO:</strong> Ferrões venenosos nas nadadeiras</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card fish-card h-100">
            <div className="card-header text-center" style={{background: 'linear-gradient(45deg, #3F72AF, #112D4E)', color: '#F9F7F7'}}>
              <h4 className="mb-0">🐟 Tambaqui</h4>
            </div>
            <div className="card-body">
              <div className="fish-info mb-3">
                <p><strong>🕐 Melhor horário:</strong> 10:00 - 12:00, 16:00 - 18:00</p>
                <p><strong>📏 Tamanho médio:</strong> 40-90cm</p>
                <p><strong>🎯 Dificuldade:</strong> <span className="badge bg-warning">Médio</span></p>
                <p><strong>🍽️ Consumo:</strong> <span className="badge bg-success">Seguro</span></p>
              </div>
              <p className="card-text"><strong>🎣 Iscas recomendadas:</strong> Massas doces, frutas, ração</p>
              <p className="card-text text-muted">Poucas espinhas, muito valorizado</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card fish-card h-100">
            <div className="card-header text-center" style={{background: 'linear-gradient(45deg, #3F72AF, #112D4E)', color: '#F9F7F7'}}>
              <h4 className="mb-0">🐟 Carpa Cabeçuda</h4>
            </div>
            <div className="card-body">
              <div className="fish-info mb-3">
                <p><strong>🕐 Melhor horário:</strong> 6:00 - 9:00, 16:00 - 18:00</p>
                <p><strong>📏 Tamanho médio:</strong> 60-90cm</p>
                <p><strong>🎯 Dificuldade:</strong> <span className="badge bg-danger">Difícil</span></p>
                <p><strong>🍽️ Consumo:</strong> <span className="badge bg-warning">Cuidado</span></p>
              </div>
              <p className="card-text"><strong>🎣 Iscas recomendadas:</strong> Iscas fermentadas, milho</p>
              <p className="card-text text-muted">Muitas espinhas pequenas, carne suave</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card fish-card h-100">
            <div className="card-header text-center" style={{background: 'linear-gradient(45deg, #3F72AF, #112D4E)', color: '#F9F7F7'}}>
              <h4 className="mb-0">🐟 Piaucu</h4>
            </div>
            <div className="card-body">
              <div className="fish-info mb-3">
                <p><strong>🕐 Melhor horário:</strong> 4:00 - 8:00</p>
                <p><strong>📏 Tamanho médio:</strong> 35-55cm</p>
                <p><strong>🎯 Dificuldade:</strong> <span className="badge bg-warning">Médio</span></p>
                <p><strong>🍽️ Consumo:</strong> <span className="badge bg-success">Seguro</span></p>
              </div>
              <p className="card-text"><strong>🎣 Iscas recomendadas:</strong> Frutas, sementes, massa</p>
              <p className="card-text text-muted">Carne firme e saborosa, poucas espinhas</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card fish-card h-100">
            <div className="card-header text-center" style={{background: 'linear-gradient(45deg, #3F72AF, #112D4E)', color: '#F9F7F7'}}>
              <h4 className="mb-0">🐟 Jatuarana</h4>
            </div>
            <div className="card-body">
              <div className="fish-info mb-3">
                <p><strong>🕐 Melhor horário:</strong> 14:00 - 20:00</p>
                <p><strong>📏 Tamanho médio:</strong> 25-40cm</p>
                <p><strong>🎯 Dificuldade:</strong> <span className="badge bg-warning">Médio</span></p>
                <p><strong>🍽️ Consumo:</strong> <span className="badge bg-success">Seguro</span></p>
              </div>
              <p className="card-text"><strong>🎣 Iscas recomendadas:</strong> Iscas artificiais, naturais</p>
              <p className="card-text text-muted">Peixe nativo, sabor marcante</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card fish-card h-100">
            <div className="card-header text-center" style={{background: 'linear-gradient(45deg, #3F72AF, #112D4E)', color: '#F9F7F7'}}>
              <h4 className="mb-0">🐟 Cascudo</h4>
            </div>
            <div className="card-body">
              <div className="fish-info mb-3">
                <p><strong>🕐 Melhor horário:</strong> 19:00 - 23:00</p>
                <p><strong>📏 Tamanho médio:</strong> 20-35cm</p>
                <p><strong>🎯 Dificuldade:</strong> <span className="badge bg-success">Fácil</span></p>
                <p><strong>🍽️ Consumo:</strong> <span className="badge bg-success">Seguro</span></p>
              </div>
              <p className="card-text"><strong>🎣 Iscas recomendadas:</strong> Minhoca, iscas de fundo</p>
              <p className="card-text text-muted">Carne branca e macia, couro resistente</p>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Informações Melhorada */}
      <div className="info-section mt-5">
        <div className="card info-card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                <h2 className="info-title">🎣 Pesqueiro Lago da Rocha do Norte</h2>
                <p className="info-description">
                  O mais tradicional da região, o Pesqueiro Lago da Rocha do Norte nunca dorme! Aberto 24 horas por dia,
                  é o destino ideal para pescadores noturnos ou para quem gosta de curtir a natureza a qualquer hora.
                  Simples, mas muito funcional, o espaço conta com quiosques e estacionamento gratuito.
                </p>
                <p className="info-highlight">
                  Um lugar acolhedor que carrega histórias e memórias de gerações!
                </p>
              </div>
              <div className="col-md-4">
                <div className="info-details">
                  <h5 className="mb-3">📊 Informações Rápidas</h5>
                  <div className="detail-row">
                    <span className="detail-icon">🕐</span>
                    <span><strong>Horário:</strong> Aberto 24h</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">💰</span>
                    <span><strong>Preço:</strong> R$15 por dia</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">📏</span>
                    <span><strong>Área:</strong> 22.000 m²</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🌊</span>
                    <span><strong>Profundidade:</strong> 4,1m (média)</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🏠</span>
                    <span><strong>Quiosques:</strong> 12 unidades</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🍽️</span>
                    <span><strong>Serviços:</strong> Quiosques, lanchonete</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🏎️</span>
                    <span><strong>Estacionamento:</strong> Gratuito (80 vagas)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Seção de Regras */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="rules-section">
                <h4 className="rules-title">📜 Regras do Pesqueiro</h4>
                <div className="row">
                  <div className="col-md-6">
                    <div className="rules-allowed">
                      <h6>✅ Permitido:</h6>
                      <ul>
                        <li>Pesca 24 horas por dia</li>
                        <li>Entrada de crianças e idosos</li>
                        <li>Coolers e bebidas próprias</li>
                        <li>Equipamentos de pesca noturna</li>
                        <li>Acampamento em áreas designadas</li>
                        <li>Fogueiras controladas</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="rules-forbidden">
                      <h6>❌ Proibido:</h6>
                      <ul>
                        <li>Pescar sem camisa</li>
                        <li>Entrada de pets/animais</li>
                        <li>Som alto após 22h</li>
                        <li>Pesca com redes grandes</li>
                        <li>Deixar lixo no local</li>
                        <li>Consumo excessivo de álcool</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Seção de Comentários Simples */}
      <div className="comments-section mt-5">
        <div className="card">
          <div className="card-body">
            <h3 className="mb-4">💬 Comentários</h3>
            
            {/* Formulário simples */}
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const nome = formData.get('nome');
              const rating = parseInt(formData.get('rating'));
              const texto = formData.get('texto');
              
              if (nome && rating && texto) {
                const novoComentario = {
                  id: Date.now(),
                  nome: nome,
                  rating: rating,
                  texto: texto,
                  data: 'agora'
                };
                setComments([novoComentario, ...comments]);
                e.target.reset();
                alert('Comentário enviado!');
              }
            }}>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <input 
                    type="text" 
                    name="nome"
                    className="form-control" 
                    placeholder="Seu nome" 
                    required
                  />
                </div>
                <div className="col-md-6">
                  <select name="rating" className="form-select" required>
                    <option value="">Avaliação</option>
                    <option value="1">⭐ 1 estrela</option>
                    <option value="2">⭐⭐ 2 estrelas</option>
                    <option value="3">⭐⭐⭐ 3 estrelas</option>
                    <option value="4">⭐⭐⭐⭐ 4 estrelas</option>
                    <option value="5">⭐⭐⭐⭐⭐ 5 estrelas</option>
                  </select>
                </div>
                <div className="col-12">
                  <textarea 
                    name="texto"
                    className="form-control" 
                    rows="3" 
                    placeholder="Sua experiência..."
                    required
                  ></textarea>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">Enviar</button>
                </div>
              </div>
            </form>
            
            <hr />
            
            {/* Lista de comentários */}
            <h5>Comentários ({comments.length})</h5>
            {comments.map((comment) => (
              <div key={comment.id} className="border-bottom pb-3 mb-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <strong>{comment.nome}</strong>
                  <div>
                    {Array.from({length: comment.rating}, (_, i) => '⭐').join('')}
                    <small className="text-muted ms-2">{comment.data}</small>
                  </div>
                </div>
                <p className="mb-0">{comment.texto}</p>
              </div>
            ))}
            
            {comments.length === 0 && (
              <p className="text-muted text-center">Nenhum comentário ainda.</p>
            )}
          </div>
        </div>
      </div>
    </div>
     
    </>
  );
}

export default Pesqueiro3;