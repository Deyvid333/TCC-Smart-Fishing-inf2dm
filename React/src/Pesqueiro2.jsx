import React, { useState, useEffect } from 'react';
import Navbar from './Componentes/Navbar/Navbar';
import './App.css';
import imgPacu from './assets/fotoCatalogo/Pacu.jpg';
import imgPintado from './assets/fotoCatalogo/Pintado.jpg';
import imgCachara from './assets/fotoCatalogo/Cachara.jpg';
import imgDourado from './assets/fotoCatalogo/Dourado.jpg';
import imgTambaqui from './assets/fotoCatalogo/Tambaqui.jpg';
import imgJundia from './assets/fotoCatalogo/Jundia.jpg';
import imgMatrinxa from './assets/fotoCatalogo/Matrinxa.jpg';
import imgTucunare from './assets/fotoCatalogo/Tucunare.jpg';
import imgTambacu from './assets/fotoCatalogo/Tambacu.jpg';
import imgTilapia from './assets/fotoCatalogo/Tilapia.jpg';
import imgCarpaCapim from './assets/fotoCatalogo/Carpa-capim.jpg';
import imgCarpaEspelho from './assets/fotoCatalogo/Carpa-espelho.jpg';
import imgBicuda from './assets/fotoCatalogo/Bicuda.jpg';
import imgPiau from './assets/fotoCatalogo/Piau.jpg';

function Pesqueiro2() {
  const [comments, setComments] = useState([
    { id: 1, nome: 'Ana Costa', rating: 4, texto: 'Pesqueiro muito bom! Peguei vários pacus e o restaurante tem comida deliciosa. Recomendo!', data: 'há 3 dias' },
    { id: 2, nome: 'Roberto Lima', rating: 5, texto: 'Lugar incrível! Consegui pescar um pintado de 4kg. A estrutura é excelente e o pessoal muito atencioso.', data: 'há 1 semana' },
    { id: 3, nome: 'Fernanda Oliveira', rating: 4, texto: 'Ambiente familiar e tranquilo. Perfeito para levar as crianças. Os peixes são abundantes!', data: 'há 2 semanas' }
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
    <span key={i} style={{ color: i < count ? '#ffc107' : '#ddd', fontSize: '1rem' }}>
      ★
    </span>
  ));

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!rating || !commentText.trim()) {
      alert('Por favor, selecione a avaliação e escreva sua experiência.');
      return;
    }
    const newComment = {
      id: Date.now(),
      nome: authorName,
      rating,
      texto: commentText.trim(),
      data: 'agora'
    };
    setComments([newComment, ...comments]);
    setRating(0);
    setHoverRating(0);
    setCommentText('');
    alert('Comentário enviado!');
  };

  const handleDeleteComment = (id) => {
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
  };

  const isCommentOwner = (comment) => currentUser && comment.nome === currentUser.nome;

  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [peixeIndex, setPeixeIndex] = useState(0);

  const peixes = [
    { nome: 'Pacu', img: imgPacu, descricao: 'Peixe de grande porte, muito apreciado pela carne saborosa.' },
    { nome: 'Pintado', img: imgPintado, descricao: 'Espécie ameaçada, símbolo da pesca esportiva brasileira.' },
    { nome: 'Cachara', img: imgCachara, descricao: 'Peixe muito encontrado no Pantanal e famoso entre pescadores.' },
    { nome: 'Dourado', img: imgDourado, descricao: 'Conhecido pela briga intensa, é um dos favoritos dos pescadores.' },
    { nome: 'Tambaqui', img: imgTambaqui, descricao: 'Um dos maiores peixes de escama da Amazônia.' },
    { nome: 'Jundiá', img: imgJundia, descricao: 'Peixe de couro muito apreciado no sul do Brasil.' },
    { nome: 'Matrinxã', img: imgMatrinxa, descricao: 'Peixe veloz e saltador, desafio para pescadores experientes.' },
    { nome: 'Tucunaré', img: imgTucunare, descricao: 'Rei da pesca esportiva, famoso pela agressividade.' },
    { nome: 'Tambacu', img: imgTambacu, descricao: 'Híbrido entre Tambaqui e Pacu, muito comum em pesqueiros.' },
    { nome: 'Tilápia', img: imgTilapia, descricao: 'Peixe muito popular em pesqueiros, resistente e saboroso.' },
    { nome: 'Carpa-capim', img: imgCarpaCapim, descricao: 'Carpa herbivora, se alimenta de plantas aquáticas.' },
    { nome: 'Carpa-espelho', img: imgCarpaEspelho, descricao: 'Carpa ornamental com escamas grandes e brilhantes.' },
    { nome: 'Bicuda', img: imgBicuda, descricao: 'Peixe de água doce conhecido pela velocidade e corpo alongado.' },
    { nome: 'Piau', img: imgPiau, descricao: 'Peixe de couro muito apreciado no interior do Brasil.' },
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
        <h1 className="text-center mb-4 text-white">Pesqueiro Lago do Pescador</h1>

        <div className="info-section mb-5">
          <div className="card info-card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-8">
                  <h2 className="info-title">Pesqueiro Lago do Pescador</h2>
                  <p className="info-description">
                    Localizado em uma área de natureza preservada, o Pesqueiro Lago do Pescador é conhecido por seu ambiente calmo e familiar.
                    Aberto até as 19h, oferece infraestrutura pensada para o conforto dos visitantes e espaço para pesca em família.
                  </p>
                  <p className="info-highlight">A escolha perfeita para quem quer pescar em um local tranquilo e bem cuidado!</p>
                </div>
                <div className="col-md-4">
                  <div className="info-details">
                    <h5 className="mb-3">Informações Rápidas</h5>
                    <div className="detail-row"><span className="detail-icon"></span><span><strong>Horário:</strong> 8h às 19h</span></div>
                    <div className="detail-row"><span className="detail-icon"></span><span><strong>Preço:</strong> R$20 por dia</span></div>
                    <div className="detail-row"><span className="detail-icon"></span><span><strong>Área:</strong> 12.500 m²</span></div>
                    <div className="detail-row"><span className="detail-icon"></span><span><strong>Profundidade:</strong> 3,2m (média)</span></div>
                    <div className="detail-row"><span className="detail-icon"></span><span><strong>Quiosques:</strong> 6 unidades</span></div>
                    <div className="detail-row"><span className="detail-icon"></span><span><strong>Estacionamento:</strong> Gratuito (35 vagas)</span></div>
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
                        <h6>Proibido:</h6>
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
                    <div className="mb-3">
                      <label className="form-label"><strong>Comentário como:</strong> {authorName}</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="form-label"><strong>Avaliação</strong></label>
                    <div className="d-flex align-items-center mb-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setRating(value)}
                          onMouseEnter={() => setHoverRating(value)}
                          onMouseLeave={() => setHoverRating(0)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1.8rem',
                            color: value <= (hoverRating || rating) ? '#ffc107' : '#ccc',
                            padding: '0 4px'
                          }}
                        >
                          ★
                        </button>
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
                        <button type="button" className="btn btn-sm btn-outline-danger ms-2" onClick={() => handleDeleteComment(comment.id)}>
                          Excluir
                        </button>
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

export default Pesqueiro2;
