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
      
      <h2 className="text-center mb-5">🐟 Catálogo de Peixes Disponíveis</h2>

      <div className="row g-4 mb-5">
        <div className="col-lg-4 col-md-6">
          <div className="card fish-card h-100">
            <div className="card-header text-center bg-warning text-dark">
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
            <div className="card-header text-center bg-info text-white">
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
            <div className="card-header text-center bg-primary text-white">
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
            <div className="card-header text-center bg-secondary text-white">
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
            <div className="card-header text-center bg-success text-white">
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
            <div className="card-header text-center bg-dark text-white">
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

export default Pesqueiro3;