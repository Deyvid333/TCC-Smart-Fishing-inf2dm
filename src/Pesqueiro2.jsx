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
      
      <h2 className="text-center mb-5">Catálogo de Peixes</h2>

      <div className="row justify-content-center align-items-stretch g-4">
        <div className="col-md-4 d-flex">
          <div className="card w-100">
          <img src={pacuImg}  className="card-img-top" alt="Pacu"  width="190px" height="100%" />
            <div className="card-body d-flex flex-column">
              <h4 className="card-title">Pacu</h4>
              <p className="card-text">Horário ideal: Durante o dia, especialmente à tarde (12h às 16h)</p>
              <p className="card-text">Tamanho médio: 30 a 60 cm</p>
              <p className="card-text">Espinhas: Tem espinhas, mas é fácil de limpar. Riscos à saúde: Nenhum</p>
              <p className="card-text">Equipamento: Vara reforçada, linha média e iscas como frutas ou massas doces</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 d-flex">
          <div className="card w-100">
            <img src={pintadoImg}  className="card-img-top" alt="Pintado" width="190px" height="100%" />
            <div className="card-body d-flex flex-column">
              <h4 className="card-title">Pintado</h4>
              <p className="card-text">Horário ideal: Noite e madrugadas (21h às 4h)</p>
              <p className="card-text">Tamanho médio: 60 cm até mais de 1 metro</p>
              <p className="card-text">Espinhas: Poucas, carne firme. Riscos à saúde: Nenhum</p>
              <p className="card-text">Equipamento: Vara pesada, linha forte e isca viva ou peixe pequeno</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 d-flex">
          <div className="card w-100">
           <img src={trairaImg}  className="card-img-top" alt="Traíra"   width="190px" height="100%" />
            <div className="card-body d-flex flex-column">
              <h4 className="card-title">Traíra</h4>
              <p className="card-text">Horário ideal: Início da manhã e fim de tarde</p>
              <p className="card-text">Tamanho médio: 20 a 50 cm</p>
              <p className="card-text">Espinhas: Muitas e finas. Riscos à saúde: Deve ser bem limpa</p>
              <p className="card-text">Equipamento: Vara comum ou molinete, iscas artificiais funcionam bem</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 d-flex">
          <div className="card w-100">
            <img src="https://via.placeholder.com/300x190/9b59b6/ffffff?text=Tambaqui" className="card-img-top" alt="Tambaqui" height="190px" />
            <div className="card-body d-flex flex-column">
              <h4 className="card-title">Tambaqui</h4>
              <p className="card-text">Horário ideal: Manhã e tarde (7h às 17h)</p>
              <p className="card-text">Tamanho médio: 40 a 70 cm</p>
              <p className="card-text">Espinhas: Poucas, carne saborosa. Riscos à saúde: Nenhum</p>
              <p className="card-text">Equipamento: Vara resistente, iscas: frutas, milho, ração</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 d-flex">
          <div className="card w-100">
            <img src="https://via.placeholder.com/300x190/f39c12/ffffff?text=Surubim" className="card-img-top" alt="Surubim" height="190px" />
            <div className="card-body d-flex flex-column">
              <h4 className="card-title">Surubim</h4>
              <p className="card-text">Horário ideal: Noite e madrugada (20h às 5h)</p>
              <p className="card-text">Tamanho médio: 60 a 100 cm</p>
              <p className="card-text">Espinhas: Poucas, carne nobre. Riscos à saúde: Nenhum</p>
              <p className="card-text">Equipamento: Vara pesada, linha forte, isca viva</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 d-flex">
          <div className="card w-100">
            <img src="https://via.placeholder.com/300x190/27ae60/ffffff?text=Curimba" className="card-img-top" alt="Curimbá" height="190px" />
            <div className="card-body d-flex flex-column">
              <h4 className="card-title">Curimbá</h4>
              <p className="card-text">Horário ideal: Manhã cedo e final da tarde (6h às 9h, 16h às 18h)</p>
              <p className="card-text">Tamanho médio: 25 a 40 cm</p>
              <p className="card-text">Espinhas: Médias, carne saborosa. Riscos à saúde: Nenhum</p>
              <p className="card-text">Equipamento: Vara leve, iscas: minhoca, massa, milho</p>
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