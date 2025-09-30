import React, { useState } from 'react';
import Navbar from './Componentes/Navbar/Navbar';
import FishAnimation from './Componentes/FishAnimation/FishAnimation';
import './App.css'; 
import pesqueiroImg from './assets/pesqueiro.png';
import tilapiaImg from './assets/Tilapia.jpeg';
import douradoImg from './assets/PeixeDourado.jpeg';
import baiacuImg from './assets/Baiacu.jpeg';
import pesqueiroImg4 from './assets/pesqueiro4.jpeg';
import pesqueiroImg5 from './assets/pesqueiro5.jpg';
import pesqueiroImg6 from './assets/pesqueiro6.jpg';



function Pesqueiro() {
  const [comments, setComments] = useState([
    {
      id: 1,
      nome: 'Carlos Silva',
      rating: 5,
      texto: 'Excelente pesqueiro! Peguei várias tilápias e um pintado de 3kg. Estrutura muito boa e atendimento nota 10!',
      data: 'há 2 dias'
    },
    {
      id: 2,
      nome: 'Maria Santos',
      rating: 4,
      texto: 'Lugar muito tranquilo para pescar em família. As crianças adoraram! Só achei o preço um pouco salgado no fim de semana.',
      data: 'há 1 semana'
    },
    {
      id: 3,
      nome: 'João Pescador',
      rating: 5,
      texto: 'Melhor pesqueiro da região! Sempre volto aqui. Os peixes são abundantes e o restaurante serve uma tilápia frita deliciosa.',
      data: 'há 2 semanas'
    }
  ]);

  const [selectedFish, setSelectedFish] = useState(null);
  const [showFishInfo, setShowFishInfo] = useState(false);
  const [currentFishIndex, setCurrentFishIndex] = useState(0);

  const peixes = [
    { nome: 'Tilápia', horario: '8:00 - 20:00', tamanho: '28-35cm', dificuldade: 'Fácil', consumo: 'Seguro', iscas: 'Minhoca, milho, massa', obs: 'Peixe ideal para iniciantes e famílias', extincao: false },
    { nome: 'Dourado', horario: '12:00 - 18:00', tamanho: '15-18cm', dificuldade: 'Fácil', consumo: 'Seguro', iscas: 'Minhoca, massa, pão', obs: 'Pequeno, colorido e divertido de pescar', extincao: true },
    { nome: 'Carpa', horario: '6:00 - 22:00', tamanho: '40-60cm', dificuldade: 'Difícil', consumo: 'Seguro', iscas: 'Milho, boilie, massa doce', obs: 'Peixe grande e forte, desafio para experientes', extincao: false },
    { nome: 'Pintado', horario: '18:00 - 6:00', tamanho: '50-80cm', dificuldade: 'Difícil', consumo: 'Seguro', iscas: 'Peixe vivo, lambari, camarão', obs: 'Peixe nobre noturno, troféu dos pescadores', extincao: true },
    { nome: 'Pacu', horario: '8:00 - 18:00', tamanho: '30-45cm', dificuldade: 'Médio', consumo: 'Seguro', iscas: 'Banana, milho, ração, massas', obs: 'Gosta de frutas, peixe interessante e saboroso', extincao: false },
    { nome: 'Bagre', horario: '18:00 - 2:00', tamanho: '30-70cm', dificuldade: 'Fácil', consumo: 'Cuidado', iscas: 'Pedaços de peixe, carne', obs: 'Ferrões venenosos nas nadadeiras', extincao: false },
    { nome: 'Tambaqui', horario: '7:00 - 17:00', tamanho: '40-70cm', dificuldade: 'Médio', consumo: 'Seguro', iscas: 'Frutas, milho, ração', obs: 'Carne saborosa, poucas espinhas', extincao: false },
    { nome: 'Surubim', horario: '20:00 - 5:00', tamanho: '60-100cm', dificuldade: 'Difícil', consumo: 'Seguro', iscas: 'Isca viva', obs: 'Carne nobre, poucas espinhas', extincao: true },
    { nome: 'Traíra', horario: '6:00 - 9:00, 16:00 - 18:00', tamanho: '20-50cm', dificuldade: 'Médio', consumo: 'Cuidado', iscas: 'Iscas artificiais, minhoca', obs: 'Muitas espinhas, deve ser bem limpa', extincao: false },
    { nome: 'Cascudo', horario: '19:00 - 23:00', tamanho: '20-35cm', dificuldade: 'Fácil', consumo: 'Seguro', iscas: 'Minhoca, iscas de fundo', obs: 'Carne branca e macia, couro resistente', extincao: false },
    { nome: 'Piaucu', horario: '4:00 - 8:00', tamanho: '35-55cm', dificuldade: 'Médio', consumo: 'Seguro', iscas: 'Frutas, sementes, massa', obs: 'Carne firme e saborosa, poucas espinhas', extincao: false },
    { nome: 'Jatuarana', horario: '14:00 - 20:00', tamanho: '25-40cm', dificuldade: 'Médio', consumo: 'Seguro', iscas: 'Iscas artificiais, naturais', obs: 'Peixe nativo, sabor marcante', extincao: true },
    { nome: 'Curimbá', horario: '6:00 - 9:00, 16:00 - 18:00', tamanho: '25-40cm', dificuldade: 'Fácil', consumo: 'Seguro', iscas: 'Minhoca, massa, milho', obs: 'Carne saborosa, espinhas médias', extincao: false },
    { nome: 'Lambari', horario: '8:00 - 17:00', tamanho: '8-15cm', dificuldade: 'Fácil', consumo: 'Seguro', iscas: 'Minhoca, massa pequena', obs: 'Peixe pequeno, ideal para crianças', extincao: false },
    { nome: 'Piau', horario: '7:00 - 16:00', tamanho: '15-25cm', dificuldade: 'Fácil', consumo: 'Seguro', iscas: 'Minhoca, milho', obs: 'Abundante, fácil de pescar', extincao: false }
  ];

  const handleFishClick = (peixe) => {
    setSelectedFish(peixe);
    setShowFishInfo(true);
  };



  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Função para obter data mínima (amanhã) e máxima (2 meses)
  const getDateLimits = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2);
    return { minDate: tomorrow, maxDate };
  };

  // Função para verificar se uma data está disponível
  const isDateAvailable = (date) => {
    const { minDate, maxDate } = getDateLimits();
    return date >= minDate && date <= maxDate;
  };

  // Função para formatar data
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Função para selecionar data
  const handleDateSelect = (date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(formatDate(date));
      setShowCalendar(false);
    }
  };

  // Renderizar calendário
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



  return (
    <>
      <Navbar />
      <FishAnimation />

    <div className="container mt-4">
      <h1 className="text-center mb-4 text-white">🎣 Pesqueiro Águas Claras</h1>
      
      {/* Seção de Informações do Pesqueiro */}
      <div className="info-section mb-5">
        <div className="card info-card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                <h2 className="info-title">🎣 Pesqueiro Águas Claras</h2>
                <p className="info-description">
                  Um dos favoritos da região, o Pesqueiro Águas Claras oferece uma experiência completa para quem ama relaxar e pescar com tranquilidade. 
                  Com funcionamento estendido até às 22h30, o local conta com um belo lago, restaurante à beira d'água, quiosque para descanso e estacionamento gratuito.
                </p>
                <p className="info-highlight">
                  Um verdadeiro refúgio para pescadores apaixonados de todos os níveis!
                </p>
              </div>
              <div className="col-md-4">
                <div className="info-details">
                  <h5 className="mb-3">📊 Informações Rápidas</h5>
                  <div className="detail-row">
                    <span className="detail-icon">🕐</span>
                    <span><strong>Horário:</strong> 8h às 22h30</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">💰</span>
                    <span><strong>Preço:</strong> R$18 (úteis) | R$25 (fins de semana)</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">📏</span>
                    <span><strong>Área:</strong> 15.000 m²</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🌊</span>
                    <span><strong>Profundidade:</strong> 2,5m (média)</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🏠</span>
                    <span><strong>Quiosques:</strong> 8 unidades</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🍽️</span>
                    <span><strong>Restaurante:</strong> 12h às 20h</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🏠</span>
                    <span><strong>Serviços:</strong> Quiosque, estacionamento</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🏎️</span>
                    <span><strong>Estacionamento:</strong> Gratuito (50 vagas)</span>
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
                        <li>Coolers e bebidas não alcoólicas</li>
                        <li>Equipamentos próprios de pesca</li>
                        <li>Fotografias e vídeos</li>
                        <li>Consumo no restaurante</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="rules-forbidden">
                      <h6>❌ Proibido:</h6>
                      <ul>
                        <li>Pescar sem camisa</li>
                        <li>Entrada de pets/animais</li>
                        <li>Bebidas alcoólicas externas</li>
                        <li>Som alto e perturbação</li>
                        <li>Pesca com redes ou tarrafas</li>
                        <li>Acampamento no local</li>
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
            onClick={() => setCurrentFishIndex(Math.min(peixes.length - 5, currentFishIndex + 5))}
            disabled={currentFishIndex >= peixes.length - 5}
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
      
      {/* Seção de Reserva do Restaurante */}
      <div className="restaurant-reservation-section mb-5">
        <div className="card">
          <div className="card-body">
            <h3 className="mb-4 text-center">🍽️ Reserva do Restaurante</h3>
            <p className="text-center text-muted mb-4">Reserve sua mesa no nosso restaurante à beira d'água e desfrute de pratos frescos com peixes do próprio pesqueiro!</p>
            
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
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="13:00">13:00</option>
                        <option value="13:30">13:30</option>
                        <option value="14:00">14:00</option>
                        <option value="18:00">18:00</option>
                        <option value="18:30">18:30</option>
                        <option value="19:00">19:00</option>
                        <option value="19:30">19:30</option>
                        <option value="20:00">20:00</option>
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
                        <option value="7">7 pessoas</option>
                        <option value="8">8 pessoas</option>
                        <option value="mais">Mais de 8 pessoas</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Ocasião Especial (Opcional)</label>
                      <select className="form-select">
                        <option value="">Nenhuma</option>
                        <option value="aniversario">Aniversário</option>
                        <option value="encontro">Encontro Romântico</option>
                        <option value="familia">Reunião de Família</option>
                        <option value="negocios">Almoço de Negócios</option>
                        <option value="comemoracao">Comemoração</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Observações (Opcional)</label>
                      <textarea className="form-control" rows="3" placeholder="Alguma preferência especial, restrição alimentar ou pedido especial?"></textarea>
                    </div>
                    <div className="col-12 text-center">
                      <button type="submit" className="btn btn-primary btn-lg px-5">🍽️ Confirmar Reserva</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
            <div className="row mt-4">
              <div className="col-12">
                <div className="alert alert-info">
                  <h6>📋 Informações Importantes:</h6>
                  <ul className="mb-0">
                    <li>Reservas devem ser feitas com pelo menos 1 dia de antecedência</li>
                    <li>Para grupos acima de 8 pessoas, entre em contato pelo telefone</li>
                    <li>Cardápio especial com peixes frescos do pesqueiro</li>
                    <li>Mesas com vista para o lago (sujeito à disponibilidade)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      
      {/* Seção de Comentários Simples */}
      <div className="comments-section mb-5">
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

export default Pesqueiro;