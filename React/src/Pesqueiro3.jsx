import React, { useState, useEffect } from 'react';
import Navbar from './Componentes/Navbar/Navbar';
import './App.css';
import imgBagre from './assets/fotoCatalogo/Catfish.jpg';
import imgCarpa from './assets/fotoCatalogo/Carpa.jpg';
import imgTambaqui from './assets/fotoCatalogo/Tambaqui.jpg';
import imgTilapia from './assets/fotoCatalogo/Tilapia.jpg';
import imgTraira from './assets/fotoCatalogo/Trairao.jpg';
import imgTrairao from './assets/fotoCatalogo/Trairao.jpg';
import imgCatfish from './assets/fotoCatalogo/Catfish.jpg';
import imgDourado from './assets/fotoCatalogo/Dourado.jpg';
import imgPatinga from './assets/fotoCatalogo/Patinga.jpg';
import imgCarpaCabecuda from './assets/fotoCatalogo/Carpa-cabecuda.jpg';
import imgCarpaHungara from './assets/fotoCatalogo/Carpa-hungara.jpg';
import imgCurimbata from './assets/fotoCatalogo/Curimbata.jpg';
import imgLambari from './assets/fotoCatalogo/Lambari.jpg';

function Pesqueiro3() {
  const [comments, setComments] = useState([
    { id: 1, nome: 'Pedro Santos', rating: 5, texto: 'Melhor pesqueiro 24h da região! Pesca noturna incrível, peguei vários bagres grandes. Preço justo!', data: 'há 1 dia' },
    { id: 2, nome: 'Lucia Ferreira', rating: 4, texto: 'Lugar tradicional e acolhedor. Sempre tem peixe! O pessoal é muito simpático e prestativo.', data: 'há 4 dias' },
    { id: 3, nome: 'Marcos Oliveira', rating: 5, texto: 'Venho aqui há anos! Nunca decepciona. Tambaquis enormes e carpas briguentas. Recomendo demais!', data: 'há 1 semana' }
  ]);
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setCurrentUser(JSON.parse(stored));
  }, []);

  const authorName = currentUser?.nome || 'Visitante';

  const renderStars = (count) => Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < count ? '#ffc107' : '#ddd', fontSize: '1rem' }}>★</span>
  ));

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!rating || !commentText.trim()) {
      alert('Por favor, selecione a avaliação e escreva sua experiência.');
      return;
    }
    setComments([{ id: Date.now(), nome: authorName, rating, texto: commentText.trim(), data: 'agora' }, ...comments]);
    setRating(0);
    setHoverRating(0);
    setCommentText('');
    alert('Comentário enviado!');
  };

  const handleDeleteComment = (id) => setComments((prev) => prev.filter((c) => c.id !== id));
  const isCommentOwner = (comment) => currentUser && comment.nome === currentUser.nome;

  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [peixeIndex, setPeixeIndex] = useState(0);

  const peixes = [
    { nome: 'Bagre-Africano', img: imgBagre, descricao: 'Peixe de couro resistente, muito usado em pesqueiros.' },
    { nome: 'Carpa', img: imgCarpa, descricao: 'Peixe resistente e saboroso, muito encontrado em lagos.' },
    { nome: 'Tambaqui', img: imgTambaqui, descricao: 'Um dos maiores peixes de escama da Amazônia.' },
    { nome: 'Tilápia', img: imgTilapia, descricao: 'Peixe muito popular em pesqueiros, resistente e saboroso.' },
    { nome: 'Traíra', img: imgTraira, descricao: 'Peixe ágil e voraz, desafio para qualquer pescador.' },
    { nome: 'Trairão', img: imgTrairao, descricao: 'Versão maior da Traíra, muito temida pelos pescadores.' },
    { nome: 'Catfish', img: imgCatfish, descricao: 'Peixe de couro americano, muito popular na pesca esportiva.' },
    { nome: 'Dourado', img: imgDourado, descricao: 'Conhecido pela briga intensa, é um dos favoritos dos pescadores.' },
    { nome: 'Patinga', img: imgPatinga, descricao: 'Híbrido entre Pacu e Tambaqui, cresce rápido e briga muito.' },
    { nome: 'Carpa-cabeçuda', img: imgCarpaCabecuda, descricao: 'Carpa de grande porte, conhecida pela cabeça grande.' },
    { nome: 'Carpa-húngara', img: imgCarpaHungara, descricao: 'Carpa europeia muito comum em pesqueiros brasileiros.' },
    { nome: 'Curimbatá', img: imgCurimbata, descricao: 'Peixe de fundo, muito comum em rios e pesqueiros.' },
    { nome: 'Lambari', img: imgLambari, descricao: 'Pequeno mas abundante, ótimo para pesca com vara simples.' },
  ];

  const peixeAtual = peixes[peixeIndex];
  const proximoPeixe = () => setPeixeIndex((peixeIndex + 1) % peixes.length);
  const peixeAnterior = () => setPeixeIndex((peixeIndex - 1 + peixes.length) % peixes.length);

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

  const formatDate = (date) => date.toISOString().split('T')[0];

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
        <button key={i} className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${!isAvailable ? 'disabled' : 'available'} ${isToday ? 'today' : ''}`}
          onClick={() => handleDateSelect(date)} disabled={!isAvailable || !isCurrentMonth}>
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
    if (direction > 0 && newMonth <= maxDate) setCurrentMonth(newMonth);
    else if (direction < 0) {
      const currentMonthStart = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
      const newMonthStart = new Date(newMonth.getFullYear(), newMonth.getMonth(), 1);
      if (newMonthStart >= currentMonthStart) setCurrentMonth(newMonth);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h1 className="text-center mb-4 text-white">Lago da Rocha do Norte</h1>

        <div className="info-section mb-5">
          <div className="card info-card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-8">
                  <h2 className="info-title">Pesqueiro Lago da Rocha do Norte</h2>
                  <p className="info-description">
                    O mais tradicional da região, o Pesqueiro Lago da Rocha do Norte nunca dorme! Aberto 24 horas por dia,
                    é o destino ideal para pescadores noturnos ou para quem gosta de curtir a natureza a qualquer hora.
                    Simples, mas muito funcional, o espaço conta com quiosques e estacionamento gratuito.
                  </p>
                  <p className="info-highlight">Um lugar acolhedor que carrega histórias e memórias de gerações!</p>
                </div>
                <div className="col-md-4">
                  <div className="info-details">
                    <h5 className="mb-3">Informações Rápidas</h5>
                    <div className="detail-row"><span className="detail-icon"></span><span><strong>Horário:</strong> Aberto 24h</span></div>
                    <div className="detail-row"><span className="detail-icon"></span><span><strong>Preço:</strong> R$15 por dia</span></div>
                    <div className="detail-row"><span className="detail-icon"></span><span><strong>Área:</strong> 22.000 m²</span></div>
                    <div className="detail-row"><span className="detail-icon"></span><span><strong>Profundidade:</strong> 4,1m (média)</span></div>
                    <div className="detail-row"><span className="detail-icon"></span><span><strong>Quiosques:</strong> 12 unidades</span></div>
                    <div className="detail-row"><span className="detail-icon"></span><span><strong>Serviços:</strong> Quiosques, lanchonete</span></div>
                    <div className="detail-row"><span className="detail-icon"></span><span><strong>Estacionamento:</strong> Gratuito (80 vagas)</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <div className="rules-section">
                  <h4 className="rules-title">Regras do Pesqueiro</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="rules-allowed">
                        <h6>Permitido:</h6>
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
                        <h6>Proibido:</h6>
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

        <h2 className="text-center mb-4">Peixes Disponíveis</h2>
        <div className="card mb-5" style={{ height: '320px', width: '100%' }}>
          <div className="card-body" style={{ height: '100%', overflow: 'hidden' }}>
            <div className="d-flex align-items-center gap-4" style={{ height: '220px' }}>
              <img src={peixeAtual.img} alt={peixeAtual.nome} style={{ width: '400px', height: '280px', objectFit: 'contain', borderRadius: '10px', flexShrink: 0, background: '#f0f0f0' }} />
              <div style={{ flex: 1, height: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
                <h4>{peixeAtual.nome}</h4>
                <p className="text-muted mb-0">{peixeAtual.descricao}</p>
              </div>
            </div>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <button className="btn btn-outline-primary" onClick={peixeAnterior}>&#8592; Anterior</button>
              <span className="align-self-center text-muted">{peixeIndex + 1} / {peixes.length}</span>
              <button className="btn btn-outline-primary" onClick={proximoPeixe}>Próximo &#8594;</button>
            </div>
          </div>
        </div>

        <div className="comments-section mb-5">
          <div className="card">
            <div className="card-body">
              <h3 className="mb-4">Comentários</h3>
              <form onSubmit={handleCommentSubmit}>
                <div className="row g-3 mb-4">
                  <div className="col-12">
                    <label className="form-label"><strong>Comentário como:</strong> {authorName}</label>
                  </div>
                  <div className="col-12">
                    <label className="form-label"><strong>Avaliação</strong></label>
                    <div className="d-flex align-items-center mb-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button key={value} type="button" onClick={() => setRating(value)}
                          onMouseEnter={() => setHoverRating(value)} onMouseLeave={() => setHoverRating(0)}
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.8rem', color: value <= (hoverRating || rating) ? '#ffc107' : '#ccc', padding: '0 4px' }}>★</button>
                      ))}
                    </div>
                    {rating === 0 && <small className="text-muted">Clique nas estrelas para avaliar.</small>}
                  </div>
                  <div className="col-12">
                    <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} className="form-control" rows="3" placeholder="Sua experiência..." required />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">Enviar</button>
                  </div>
                </div>
              </form>
              <hr />
              <h5>Comentários ({comments.length})</h5>
              {comments.map((comment) => (
                <div key={comment.id} className="border-bottom pb-3 mb-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <strong>{comment.nome}</strong>
                      <div>{renderStars(comment.rating)}</div>
                    </div>
                    <div className="text-end">
                      <small className="text-muted">{comment.data}</small>
                      {isCommentOwner(comment) && (
                        <button type="button" className="btn btn-sm btn-outline-danger ms-2" onClick={() => handleDeleteComment(comment.id)}>Excluir</button>
                      )}
                    </div>
                  </div>
                  <p className="mb-0">{comment.texto}</p>
                </div>
              ))}
              {comments.length === 0 && <p className="text-muted text-center">Nenhum comentário ainda.</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pesqueiro3;
