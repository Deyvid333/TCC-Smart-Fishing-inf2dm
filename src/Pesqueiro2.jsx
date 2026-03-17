import React, { useState } from 'react';
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

  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const peixes = [
    { nome: 'Pacu' },
    { nome: 'Pintado' },
    { nome: 'Cachara' },
    { nome: 'Dourado' },
    { nome: 'Tambaqui' },
    { nome: 'Jundiá' },
    { nome: 'Matrinxã' },
    { nome: 'Tucunaré' },
    { nome: 'Tambacu' },
    { nome: 'Tilápia' },
    { nome: 'Carpa-capim' },
    { nome: 'Carpa-espelho' },
    { nome: 'Bicuda' },
    { nome: 'Piau' },
  ];

  const peixeImagens = {
    'Pacu': imgPacu,
    'Pintado': imgPintado,
    'Cachara': imgCachara,
    'Dourado': imgDourado,
    'Tambaqui': imgTambaqui,
    'Jundiá': imgJundia,
    'Matrinxã': imgMatrinxa,
    'Tucunaré': imgTucunare,
    'Tambacu': imgTambacu,
    'Tilápia': imgTilapia,
    'Carpa-capim': imgCarpaCapim,
    'Carpa-espelho': imgCarpaEspelho,
    'Bicuda': imgBicuda,
    'Piau': imgPiau,
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
        <h1 className="text-center mb-4 text-white">Pesqueiro Lago do Pescador</h1>

        <div className="info-section mb-5">
          <div className="card info-card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-8">
                  <h2 className="info-title">Pesqueiro Lago do Pescador</h2>
                  <p className="info-description">
                    Localizado em uma área de natureza preservada, o Pesqueiro Lago do Pescador é conhecido por seu ambiente calmo e familiar.
                    Aberto até as 19h, oferece um restaurante com peixes frescos direto do lago e infraestrutura pensada para o conforto dos visitantes.
                  </p>
                  <p className="info-highlight">A escolha perfeita para quem quer pescar e saborear boas refeições com vista para a água!</p>
                </div>
                <div className="col-md-4">
                  <div className="info-details">
                    <h5 className="mb-3">Informações Rápidas</h5>
                    <div className="detail-row"><span className="detail-icon"></span><span><strong>Horário:</strong> 8h às 19h</span></div>
                    <div className="detail-row"><span className="detail-icon"></span><span><strong>Preço:</strong> R$20 por dia</span></div>
                    <div className="detail-row"><span className="detail-icon"></span><span><strong>Área:</strong> 12.500 m²</span></div>
                    <div className="detail-row"><span className="detail-icon"></span><span><strong>Profundidade:</strong> 3,2m (média)</span></div>
                    <div className="detail-row"><span className="detail-icon"></span><span><strong>Quiosques:</strong> 6 unidades</span></div>
                    <div className="detail-row"><span className="detail-icon"></span><span><strong>Restaurante:</strong> 11h30 às 19h</span></div>
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

        <div className="restaurant-reservation-section mb-5">
          <div className="card">
            <div className="card-body">
              <h3 className="mb-4 text-center">Reserva do Restaurante</h3>
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
                          <input type="text" className="form-control" placeholder="Clique para selecionar a data"
                            value={selectedDate ? new Date(selectedDate).toLocaleDateString('pt-BR') : ''}
                            onClick={() => setShowCalendar(!showCalendar)} readOnly required />
                          {showCalendar && (
                            <div className="calendar-popup">
                              <div className="calendar-header">
                                <button type="button" onClick={() => changeMonth(-1)}>&lt;</button>
                                <span>{currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</span>
                                <button type="button" onClick={() => changeMonth(1)}>&gt;</button>
                              </div>
                              <div className="calendar-weekdays">
                                <div>Dom</div><div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div><div>Sáb</div>
                              </div>
                              <div className="calendar-days">{renderCalendar()}</div>
                              <div className="calendar-footer"><small className="text-muted">Reservas com 1 dia de antecedência mínima</small></div>
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
                        <button type="submit" className="btn btn-primary btn-lg px-5">Reservar Mesa</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12">
                  <div className="alert alert-info">
                    <h6>Informações do Restaurante:</h6>
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

export default Pesqueiro2;
