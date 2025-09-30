import React, { useState } from 'react';
import Navbar from './Componentes/Navbar/Navbar';
import pacuImg from './assets/Pacu.jpeg';
import pintadoImg from './assets/pintado.jpg';
import trairaImg from './assets/Peixe-Traira.webp';
import pesqueiroImg from './assets/pesqueiro2.png';
import pesqueiroImg7 from './assets/pesqueiro7.jpg';
import pesqueiroImg8 from './assets/pesqueiro8.jpg';
import pesqueiroImg9 from './assets/pesqueiro9.jpg';
import './App.css'

function Pesqueiro2() {
  const [comments, setComments] = useState([
    {
      id: 1,
      nome: 'Ana Costa',
      rating: 4,
      texto: 'Pesqueiro muito bom! Peguei vários pacus e o restaurante tem comida deliciosa. Recomendo!',
      data: 'há 3 dias'
    },
    {
      id: 2,
      nome: 'Roberto Lima',
      rating: 5,
      texto: 'Lugar incrível! Consegui pescar um pintado de 4kg. A estrutura é excelente e o pessoal muito atencioso.',
      data: 'há 1 semana'
    },
    {
      id: 3,
      nome: 'Fernanda Oliveira',
      rating: 4,
      texto: 'Ambiente familiar e tranquilo. Perfeito para levar as crianças. Os peixes são abundantes!',
      data: 'há 2 semanas'
    }
  ]);

  const [selectedFish, setSelectedFish] = useState(null);
  const [showFishInfo, setShowFishInfo] = useState(false);
  const [currentFishIndex, setCurrentFishIndex] = useState(0);

  const peixes = [
    { nome: 'Pacu-Caranha', horario: '10:00 - 14:00', tamanho: '35-65cm', dificuldade: 'Médio', consumo: 'Seguro', iscas: 'Frutas maduras, caju, manga', obs: 'Especialista em frutas, carne doce', extincao: false },
    { nome: 'Pintado-Real', horario: '20:00 - 3:00', tamanho: '70-120cm', dificuldade: 'Muito Difícil', consumo: 'Seguro', iscas: 'Tuvira, lambari vivo', obs: 'Rei dos peixes nobres, troféu máximo', extincao: true },
    { nome: 'Matrinxã', horario: '5:00 - 8:00, 17:00 - 19:00', tamanho: '25-45cm', dificuldade: 'Médio', consumo: 'Seguro', iscas: 'Frutas pequenas, insetos', obs: 'Peixe saltador, muito ágil', extincao: true },
    { nome: 'Piraputanga', horario: '6:00 - 10:00, 16:00 - 18:00', tamanho: '30-50cm', dificuldade: 'Médio', consumo: 'Seguro', iscas: 'Frutas, sementes, ração', obs: 'Peixe do Pantanal, colorido', extincao: false },
    { nome: 'Cachara', horario: '19:00 - 4:00', tamanho: '50-90cm', dificuldade: 'Difícil', consumo: 'Seguro', iscas: 'Peixe vivo, camarão', obs: 'Primo do pintado, carne firme', extincao: true },
    { nome: 'Piapara', horario: '7:00 - 11:00, 15:00 - 17:00', tamanho: '20-35cm', dificuldade: 'Fácil', consumo: 'Seguro', iscas: 'Minhoca, massa, milho', obs: 'Abundante, fácil de pescar', extincao: false },
    { nome: 'Barbado', horario: '18:00 - 22:00', tamanho: '40-70cm', dificuldade: 'Médio', consumo: 'Seguro', iscas: 'Minhocuçu, pedaços de peixe', obs: 'Bigodes longos, noturno', extincao: false },
    { nome: 'Piracanjuba', horario: '11:00 - 15:00', tamanho: '35-60cm', dificuldade: 'Médio', consumo: 'Seguro', iscas: 'Frutas, milho, ração', obs: 'Peixe migratório, saboroso', extincao: true },
    { nome: 'Corvina', horario: '8:00 - 18:00', tamanho: '25-40cm', dificuldade: 'Fácil', consumo: 'Seguro', iscas: 'Minhoca, camarão, massa', obs: 'Carne branca, sem espinhas', extincao: false },
    { nome: 'Jundiá', horario: '17:00 - 1:00', tamanho: '20-40cm', dificuldade: 'Fácil', consumo: 'Seguro', iscas: 'Minhoca, iscas de fundo', obs: 'Couro liso, carne macia', extincao: false },
    { nome: 'Mandi-Pintado', horario: '19:00 - 23:00', tamanho: '15-30cm', dificuldade: 'Fácil', consumo: 'Seguro', iscas: 'Minhoca pequena, massa', obs: 'Pequeno mas saboroso', extincao: false },
    { nome: 'Piau-Três-Pintas', horario: '6:00 - 16:00', tamanho: '12-25cm', dificuldade: 'Fácil', consumo: 'Seguro', iscas: 'Minhoca, milho, massa', obs: 'Três manchas características', extincao: false }
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

  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDateLimits = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2);
    return { minDate: tomorrow, maxDate };
  };

  const isDateAvailable = (date) => {
    const { minDate, maxDate } = getDateLimits();
    return date >= minDate && date <= maxDate;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handleDateSelect = (date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(formatDate(date));
      setShowCalendar(false);
    }
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(current);
      const isCurrentMonth = date.getMonth() === month;
      const isAvailable = isDateAvailable(date);
      const isToday = date.toDateString() === new Date().toDateString();
      
      days.push(
        <button
          key={i}
          className={`calendar-day ${
            !isCurrentMonth ? 'other-month' : ''
          } ${
            !isAvailable ? 'disabled' : 'available'
          } ${
            isToday ? 'today' : ''
          }`}
          onClick={() => handleDateSelect(date)}
          disabled={!isAvailable || !isCurrentMonth}
        >
          {date.getDate()}
        </button>
      );
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const changeMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    const { minDate, maxDate } = getDateLimits();
    
    // Permite navegar para frente até o máximo
    if (direction > 0 && newMonth <= maxDate) {
      setCurrentMonth(newMonth);
    }
    // Permite navegar para trás até o mês atual
    else if (direction < 0) {
      const currentMonthStart = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
      const newMonthStart = new Date(newMonth.getFullYear(), newMonth.getMonth(), 1);
      if (newMonthStart >= currentMonthStart) {
        setCurrentMonth(newMonth);
      }
    }
  };

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
      <h1 className="text-center mb-4 text-white">🎣 Pesqueiro Lago do Pescador</h1>
      
      {/* Seção de Informações do Pesqueiro */}
      <div className="info-section mb-5">
        <div className="card info-card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                <h2 className="info-title">🎣 Pesqueiro Lago do Pescador</h2>
                <p className="info-description">
                  Localizado em uma área de natureza preservada, o Pesqueiro Lago do Pescador é conhecido por seu ambiente calmo e familiar.
                  Aberto até as 19h, oferece um restaurante com peixes frescos direto do lago e infraestrutura pensada para o conforto dos visitantes.
                </p>
                <p className="info-highlight">
                  A escolha perfeita para quem quer pescar e saborear boas refeições com vista para a água!
                </p>
              </div>
              <div className="col-md-4">
                <div className="info-details">
                  <h5 className="mb-3">📊 Informações Rápidas</h5>
                  <div className="detail-row">
                    <span className="detail-icon">🕐</span>
                    <span><strong>Horário:</strong> 8h às 19h</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">💰</span>
                    <span><strong>Preço:</strong> R$20 por dia</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">📏</span>
                    <span><strong>Área:</strong> 12.500 m²</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🌊</span>
                    <span><strong>Profundidade:</strong> 3,2m (média)</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🏠</span>
                    <span><strong>Quiosques:</strong> 6 unidades</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🍽️</span>
                    <span><strong>Restaurante:</strong> 11h30 às 19h</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🏠</span>
                    <span><strong>Serviços:</strong> Peixes frescos, quiosques</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🏎️</span>
                    <span><strong>Estacionamento:</strong> Gratuito (35 vagas)</span>
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
                        <li>Entrada de crianças acompanhadas</li>
                        <li>Pets de pequeno porte (coleira)</li>
                        <li>Coolers e lanches próprios</li>
                        <li>Equipamentos de pesca</li>
                        <li>Churrasco em áreas designadas</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="rules-forbidden">
                      <h6>❌ Proibido:</h6>
                      <ul>
                        <li>Pescar sem camisa</li>
                        <li>Bebidas alcoólicas em excesso</li>
                        <li>Pesca noturna após 19h</li>
                        <li>Fogueiras e acampamento</li>
                        <li>Pesca com explosivos</li>
                        <li>Perturbação da fauna local</li>
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
              <h4 className="mb-0">🐟 Pacu</h4>
            </div>
            <div className="card-body">
              <div className="fish-info mb-3">
                <p><strong>🕐 Melhor horário:</strong> 12:00 - 16:00</p>
                <p><strong>📏 Tamanho médio:</strong> 30-60cm</p>
                <p><strong>🎯 Dificuldade:</strong> <span className="badge bg-warning">Médio</span></p>
                <p><strong>🍽️ Consumo:</strong> <span className="badge bg-success">Seguro</span></p>
              </div>
              <p className="card-text"><strong>🎣 Iscas recomendadas:</strong> Frutas, massas doces</p>
              <p className="card-text text-muted">Gosta de frutas, fácil de limpar</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card fish-card h-100">
            <div className="card-header text-center" style={{background: 'linear-gradient(45deg, #3F72AF, #112D4E)', color: '#F9F7F7'}}>
              <h4 className="mb-0">🐟 Pintado</h4>
            </div>
            <div className="card-body">
              <div className="fish-info mb-3">
                <p><strong>🕐 Melhor horário:</strong> 21:00 - 4:00</p>
                <p><strong>📏 Tamanho médio:</strong> 60-100cm</p>
                <p><strong>🎯 Dificuldade:</strong> <span className="badge bg-danger">Difícil</span></p>
                <p><strong>🍽️ Consumo:</strong> <span className="badge bg-success">Seguro</span></p>
              </div>
              <p className="card-text"><strong>🎣 Iscas recomendadas:</strong> Isca viva, peixe pequeno</p>
              <p className="card-text text-muted">Peixe nobre noturno, carne firme</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card fish-card h-100">
            <div className="card-header text-center" style={{background: 'linear-gradient(45deg, #3F72AF, #112D4E)', color: '#F9F7F7'}}>
              <h4 className="mb-0">🐟 Traíra</h4>
            </div>
            <div className="card-body">
              <div className="fish-info mb-3">
                <p><strong>🕐 Melhor horário:</strong> 6:00 - 9:00, 16:00 - 18:00</p>
                <p><strong>📏 Tamanho médio:</strong> 20-50cm</p>
                <p><strong>🎯 Dificuldade:</strong> <span className="badge bg-warning">Médio</span></p>
                <p><strong>🍽️ Consumo:</strong> <span className="badge bg-warning">Cuidado</span></p>
              </div>
              <p className="card-text"><strong>🎣 Iscas recomendadas:</strong> Iscas artificiais, minhoca</p>
              <p className="card-text text-muted">Muitas espinhas, deve ser bem limpa</p>
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
                <p><strong>🕐 Melhor horário:</strong> 7:00 - 17:00</p>
                <p><strong>📏 Tamanho médio:</strong> 40-70cm</p>
                <p><strong>🎯 Dificuldade:</strong> <span className="badge bg-warning">Médio</span></p>
                <p><strong>🍽️ Consumo:</strong> <span className="badge bg-success">Seguro</span></p>
              </div>
              <p className="card-text"><strong>🎣 Iscas recomendadas:</strong> Frutas, milho, ração</p>
              <p className="card-text text-muted">Carne saborosa, poucas espinhas</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card fish-card h-100">
            <div className="card-header text-center" style={{background: 'linear-gradient(45deg, #3F72AF, #112D4E)', color: '#F9F7F7'}}>
              <h4 className="mb-0">🐟 Surubim</h4>
            </div>
            <div className="card-body">
              <div className="fish-info mb-3">
                <p><strong>🕐 Melhor horário:</strong> 20:00 - 5:00</p>
                <p><strong>📏 Tamanho médio:</strong> 60-100cm</p>
                <p><strong>🎯 Dificuldade:</strong> <span className="badge bg-danger">Difícil</span></p>
                <p><strong>🍽️ Consumo:</strong> <span className="badge bg-success">Seguro</span></p>
              </div>
              <p className="card-text"><strong>🎣 Iscas recomendadas:</strong> Isca viva</p>
              <p className="card-text text-muted">Carne nobre, poucas espinhas</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card fish-card h-100">
            <div className="card-header text-center" style={{background: 'linear-gradient(45deg, #3F72AF, #112D4E)', color: '#F9F7F7'}}>
              <h4 className="mb-0">🐟 Curimbá</h4>
            </div>
            <div className="card-body">
              <div className="fish-info mb-3">
                <p><strong>🕐 Melhor horário:</strong> 6:00 - 9:00, 16:00 - 18:00</p>
                <p><strong>📏 Tamanho médio:</strong> 25-40cm</p>
                <p><strong>🎯 Dificuldade:</strong> <span className="badge bg-success">Fácil</span></p>
                <p><strong>🍽️ Consumo:</strong> <span className="badge bg-success">Seguro</span></p>
              </div>
              <p className="card-text"><strong>🎣 Iscas recomendadas:</strong> Minhoca, massa, milho</p>
              <p className="card-text text-muted">Carne saborosa, espinhas médias</p>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Reserva do Restaurante */}
      <div className="restaurant-reservation-section mt-5">
        <div className="card">
          <div className="card-body">
            <h3 className="mb-4 text-center">🍽️ Reserva do Restaurante</h3>
            <p className="text-center text-muted mb-4">Desfrute de peixes frescos direto do lago em nosso restaurante com vista panorâmica!</p>
            
            <div className="row justify-content-center">
              <div className="col-md-8">
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Nome Completo</label>
                      <input type="text" className="form-control" placeholder="Seu nome" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Telefone</label>
                      <input type="tel" className="form-control" placeholder="(11) 99999-9999" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Data da Reserva</label>
                      <div className="position-relative">
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Clique para selecionar a data"
                          value={selectedDate ? new Date(selectedDate).toLocaleDateString('pt-BR') : ''}
                          onClick={() => setShowCalendar(!showCalendar)}
                          readOnly
                          required 
                        />
                        {showCalendar && (
                          <div className="calendar-popup">
                            <div className="calendar-header">
                              <button type="button" onClick={() => changeMonth(-1)}>&lt;</button>
                              <span>{currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</span>
                              <button type="button" onClick={() => changeMonth(1)}>&gt;</button>
                            </div>
                            <div className="calendar-weekdays">
                              <div>Dom</div>
                              <div>Seg</div>
                              <div>Ter</div>
                              <div>Qua</div>
                              <div>Qui</div>
                              <div>Sex</div>
                              <div>Sáb</div>
                            </div>
                            <div className="calendar-days">
                              {renderCalendar()}
                            </div>
                            <div className="calendar-footer">
                              <small className="text-muted">Reservas com 1 dia de antecedência mínima</small>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Horário</label>
                      <select className="form-select" required>
                        <option value="">Selecione o horário</option>
                        <option value="11:30">11:30</option>
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="13:00">13:00</option>
                        <option value="13:30">13:30</option>
                        <option value="14:00">14:00</option>
                        <option value="17:30">17:30</option>
                        <option value="18:00">18:00</option>
                        <option value="18:30">18:30</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Número de Pessoas</label>
                      <select className="form-select" required>
                        <option value="">Quantas pessoas?</option>
                        <option value="1">1 pessoa</option>
                        <option value="2">2 pessoas</option>
                        <option value="3">3 pessoas</option>
                        <option value="4">4 pessoas</option>
                        <option value="5">5 pessoas</option>
                        <option value="6">6 pessoas</option>
                        <option value="mais">Mais de 6 pessoas</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Preferência de Mesa</label>
                      <select className="form-select">
                        <option value="">Sem preferência</option>
                        <option value="vista-lago">Vista para o lago</option>
                        <option value="area-interna">Área interna</option>
                        <option value="varanda">Varanda</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Observações (Opcional)</label>
                      <textarea className="form-control" rows="3" placeholder="Alguma preferência especial ou restrição alimentar?"></textarea>
                    </div>
                    <div className="col-12 text-center">
                      <button type="submit" className="btn btn-primary btn-lg px-5">🍽️ Reservar Mesa</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
            <div className="row mt-4">
              <div className="col-12">
                <div className="alert alert-info">
                  <h6>📋 Informações do Restaurante:</h6>
                  <ul className="mb-0">
                    <li>Especialidade em peixes frescos do próprio lago</li>
                    <li>Horário de funcionamento: 11:30 às 19:00</li>
                    <li>Reservas com 1 dia de antecedência mínima</li>
                    <li>Ambiente familiar com vista para a natureza</li>
                  </ul>
                </div>
              </div>
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
                <h2 className="info-title">🎣 Pesqueiro Lago do Pescador</h2>
                <p className="info-description">
                  Localizado em uma área de natureza preservada, o Pesqueiro Lago do Pescador é conhecido por seu ambiente calmo e familiar.
                  Aberto até as 19h, oferece um restaurante com peixes frescos direto do lago e infraestrutura pensada para o conforto dos visitantes.
                </p>
                <p className="info-highlight">
                  A escolha perfeita para quem quer pescar e saborear boas refeições com vista para a água!
                </p>
              </div>
              <div className="col-md-4">
                <div className="info-details">
                  <h5 className="mb-3">📊 Informações Rápidas</h5>
                  <div className="detail-row">
                    <span className="detail-icon">🕐</span>
                    <span><strong>Horário:</strong> 8h às 19h</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">💰</span>
                    <span><strong>Preço:</strong> R$20 por dia</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">📏</span>
                    <span><strong>Área:</strong> 12.500 m²</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🌊</span>
                    <span><strong>Profundidade:</strong> 3,2m (média)</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🏠</span>
                    <span><strong>Quiosques:</strong> 6 unidades</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🍽️</span>
                    <span><strong>Restaurante:</strong> 11h30 às 19h</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🏠</span>
                    <span><strong>Serviços:</strong> Peixes frescos, quiosques</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🏎️</span>
                    <span><strong>Estacionamento:</strong> Gratuito (35 vagas)</span>
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
                        <li>Entrada de crianças acompanhadas</li>
                        <li>Pets de pequeno porte (coleira)</li>
                        <li>Coolers e lanches próprios</li>
                        <li>Equipamentos de pesca</li>
                        <li>Churrasco em áreas designadas</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="rules-forbidden">
                      <h6>❌ Proibido:</h6>
                      <ul>
                        <li>Pescar sem camisa</li>
                        <li>Bebidas alcoólicas em excesso</li>
                        <li>Pesca noturna após 19h</li>
                        <li>Fogueiras e acampamento</li>
                        <li>Pesca com explosivos</li>
                        <li>Perturbação da fauna local</li>
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

export default Pesqueiro2;