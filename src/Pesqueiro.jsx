import React, { useState } from 'react';
import Navbar from './Componentes/Navbar/Navbar';
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
      <h1 className="text-center mb-4 text-white">🎣 Pesqueiro dos Vara Grande</h1>
      
      <h2 className="text-center mb-5">Catálogo de Peixes</h2>

      <div className="fish-catalog-modern">
        <div className="fish-item">
          <div className="fish-emoji">🐟</div>
          <div className="fish-content">
            <h4 className="fish-title">Tilápia</h4>
            <div className="fish-details-grid">
              <div className="detail-badge time">🕐 8:00-20:00</div>
              <div className="detail-badge size">📏 28-35cm</div>
              <div className="detail-badge safe">✅ Seguro</div>
              <div className="detail-badge easy">🎯 Fácil</div>
            </div>
            <p className="fish-description">Peixe ideal para iniciantes. Iscas: minhoca, milho, massa.</p>
          </div>
        </div>

        <div className="fish-item">
          <div className="fish-emoji">🐠</div>
          <div className="fish-content">
            <h4 className="fish-title">Peixe Dourado</h4>
            <div className="fish-details-grid">
              <div className="detail-badge time">🕐 12:00-18:00</div>
              <div className="detail-badge size">📏 15-18cm</div>
              <div className="detail-badge safe">✅ Seguro</div>
              <div className="detail-badge easy">🎯 Fácil</div>
            </div>
            <p className="fish-description">Pequeno e colorido. Iscas: minhoca, massa, pão.</p>
          </div>
        </div>

        <div className="fish-item">
          <div className="fish-emoji">🐡</div>
          <div className="fish-content">
            <h4 className="fish-title">Baiacu</h4>
            <div className="fish-details-grid">
              <div className="detail-badge time">🕐 15:00-19:00</div>
              <div className="detail-badge size">📏 12-15cm</div>
              <div className="detail-badge danger">⚠️ Venenoso</div>
              <div className="detail-badge medium">🎯 Médio</div>
            </div>
            <p className="fish-description">ATENÇÃO: Não consumir! Apenas pesca esportiva.</p>
          </div>
        </div>

        <div className="fish-item">
          <div className="fish-emoji">🐟</div>
          <div className="fish-content">
            <h4 className="fish-title">Carpa</h4>
            <div className="fish-details-grid">
              <div className="detail-badge time">🕐 6:00-22:00</div>
              <div className="detail-badge size">📏 40-60cm</div>
              <div className="detail-badge safe">✅ Seguro</div>
              <div className="detail-badge hard">🎯 Difícil</div>
            </div>
            <p className="fish-description">Peixe grande e forte. Iscas: milho, boilie, massa doce.</p>
          </div>
        </div>

        <div className="fish-item">
          <div className="fish-emoji">🐟</div>
          <div className="fish-content">
            <h4 className="fish-title">Pintado</h4>
            <div className="fish-details-grid">
              <div className="detail-badge time">🕐 18:00-6:00</div>
              <div className="detail-badge size">📏 50-80cm</div>
              <div className="detail-badge safe">✅ Seguro</div>
              <div className="detail-badge hard">🎯 Difícil</div>
            </div>
            <p className="fish-description">Peixe nobre noturno. Iscas: peixe vivo, lambari, camarão.</p>
          </div>
        </div>

        <div className="fish-item">
          <div className="fish-emoji">🐟</div>
          <div className="fish-content">
            <h4 className="fish-title">Pacu</h4>
            <div className="fish-details-grid">
              <div className="detail-badge time">🕐 8:00-18:00</div>
              <div className="detail-badge size">📏 30-45cm</div>
              <div className="detail-badge safe">✅ Seguro</div>
              <div className="detail-badge medium">🎯 Médio</div>
            </div>
            <p className="fish-description">Gosta de frutas. Iscas: banana, milho, ração, massas.</p>
          </div>
        </div>
      </div>
      
      {/* Seção de Informações Melhorada */}
      <div className="info-section mt-5">
        <div className="card info-card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                <h2 className="info-title">🎣 Pesqueiro dos Vara Grande</h2>
                <p className="info-description">
                  Um dos favoritos da região, o Pesqueiro dos Vara Grande oferece uma experiência completa para quem ama relaxar e pescar com tranquilidade. 
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
                    <span><strong>Serviços:</strong> Restaurante, quiosque</span>
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
      
      {/* Seção de Comentários no Final */}
      <div className="comments-section mt-5">
        <div className="card">
          <div className="card-body">
            <h3 className="mb-4">💬 Comentários e Experiências</h3>
            
            {/* Formulário para novo comentário */}
            <div className="comment-form mb-4">
              <h5>Compartilhe sua experiência:</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Seu nome" 
                    name="nome"
                    value={newComment.nome}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <div className="rating-stars mb-2">
                    <span>Avaliação: </span>
                    {renderStars(newComment.rating, true)}
                  </div>
                </div>
                <div className="mb-3">
                  <textarea 
                    className="form-control" 
                    rows="3" 
                    placeholder="Conte como foi sua experiência no pesqueiro..."
                    name="texto"
                    value={newComment.texto}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Enviar Comentário</button>
              </form>
            </div>
            
            <hr />
            
            {/* Comentários existentes */}
            <div className="existing-comments">
              <h5 className="mb-3">Experiências de outros pescadores ({comments.length}):</h5>
              
              {comments.map((comment) => (
                <div key={comment.id} className="comment-item mb-3">
                  <div className="comment-header">
                    <strong>{comment.nome}</strong>
                    <span className="comment-rating">
                      {renderStars(comment.rating)}
                    </span>
                    <small className="text-muted">{comment.data}</small>
                  </div>
                  <p className="comment-text">{comment.texto}</p>
                </div>
              ))}
              
              {comments.length === 0 && (
                <p className="text-muted text-center">Nenhum comentário ainda. Seja o primeiro a compartilhar sua experiência!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Pesqueiro;