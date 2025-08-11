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
      <h1 className="text-center mb-4 text-white">🎣 Pesqueiro Lago do Pescador</h1>
      
      <h2 className="text-center mb-5">🐟 Catálogo de Peixes Disponíveis</h2>

      <div className="row g-4 mb-5">
        <div className="col-lg-4 col-md-6">
          <div className="card fish-card h-100">
            <div className="card-header text-center bg-secondary text-white">
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
            <div className="card-header text-center bg-dark text-white">
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
            <div className="card-header text-center bg-warning text-dark">
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
            <div className="card-header text-center bg-info text-white">
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
            <div className="card-header text-center bg-primary text-white">
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
            <div className="card-header text-center bg-success text-white">
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
                    <span><strong>Serviços:</strong> Restaurante com peixes frescos</span>
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

export default Pesqueiro2;