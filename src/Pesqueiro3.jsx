import React, { useState } from 'react';
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

  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const peixes = [
    { nome: 'Bagre-Africano' },
    { nome: 'Carpa' },
    { nome: 'Tambaqui' },
    { nome: 'Tilápia' },
    { nome: 'Traíra' },
    { nome: 'Trairão' },
    { nome: 'Catfish' },
    { nome: 'Dourado' },
    { nome: 'Patinga' },
    { nome: 'Carpa-cabeçuda' },
    { nome: 'Carpa-húngara' },
    { nome: 'Curimbatá' },
    { nome: 'Lambari' },
  ];

  const peixeImagens = {
    'Bagre-Africano': imgBagre,
    'Carpa': imgCarpa,
    'Tambaqui': imgTambaqui,
    'Tilápia': imgTilapia,
    'Traíra': imgTraira,
    'Trairão': imgTrairao,
    'Catfish': imgCatfish,
    'Dourado': imgDourado,
    'Patinga': imgPatinga,
    'Carpa-cabeçuda': imgCarpaCabecuda,
    'Carpa-húngara': imgCarpaHungara,
    'Curimbatá': imgCurimbata,
    'Lambari': imgLambari,
  };

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
        <div className="card mb-5">
          <div className="card-body">
            <div className="row g-3">
              {peixes.map((peixe, index) => (
                <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2 text-center">
                  <div style={{ border: '1px solid #DBE2EF', borderRadius: '10px', overflow: 'hidden', background: '#F9F7F7' }}>
                    <img src={peixeImagens[peixe.nome] || imgTilapia} alt={peixe.nome} style={{ width: '100%', height: '90px', objectFit: 'cover' }} />
                    <div style={{ padding: '6px 4px', fontSize: '0.85rem', fontWeight: '600', color: '#112D4E' }}>
                      {peixe.nome}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="comments-section mb-5">
          <div className="card">
            <div className="card-body">
              <h3 className="mb-4">Comentários</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const nome = formData.get('nome');
                const rating = parseInt(formData.get('rating'));
                const texto = formData.get('texto');
                if (nome && rating && texto) {
                  setComments([{ id: Date.now(), nome, rating, texto, data: 'agora' }, ...comments]);
                  e.target.reset();
                  alert('Comentário enviado!');
                }
              }}>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <input type="text" name="nome" className="form-control" placeholder="Seu nome" required />
                  </div>
                  <div className="col-md-6">
                    <select name="rating" className="form-select" required>
                      <option value="">Avaliação</option>
                      <option value="1">1 estrela</option>
                      <option value="2">2 estrelas</option>
                      <option value="3">3 estrelas</option>
                      <option value="4">4 estrelas</option>
                      <option value="5">5 estrelas</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <textarea name="texto" className="form-control" rows="3" placeholder="Sua experiência..." required></textarea>
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
                    <strong>{comment.nome}</strong>
                    <small className="text-muted">{comment.data}</small>
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
