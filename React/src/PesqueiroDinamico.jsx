import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Componentes/Navbar/Navbar';
import './App.css';

import imgTilapia from './assets/fotoCatalogo/Tilapia.jpg';
import imgDourado from './assets/fotoCatalogo/Dourado.jpg';
import imgCarpa from './assets/fotoCatalogo/Carpa.jpg';
import imgPintado from './assets/fotoCatalogo/Pintado.jpg';
import imgPacu from './assets/fotoCatalogo/Pacu.jpg';
import imgTambaqui from './assets/fotoCatalogo/Tambaqui.jpg';
import imgTraira from './assets/fotoCatalogo/Traira.jpg';
import imgCurimbata from './assets/fotoCatalogo/Curimbata.jpg';
import imgLambari from './assets/fotoCatalogo/Lambari.jpg';
import imgPiau from './assets/fotoCatalogo/Piau.jpg';
import imgPatinga from './assets/fotoCatalogo/Patinga.jpg';
import imgJundia from './assets/fotoCatalogo/Jundia.jpg';
import imgMatrinxa from './assets/fotoCatalogo/Matrinxa.jpg';
import imgTucunare from './assets/fotoCatalogo/Tucunare.jpg';
import imgTambacu from './assets/fotoCatalogo/Tambacu.jpg';
import imgCachara from './assets/fotoCatalogo/Cachara.jpg';
import imgBicuda from './assets/fotoCatalogo/Bicuda.jpg';
import imgCarpaCapim from './assets/fotoCatalogo/Carpa-capim.jpg';
import imgCarpaEspelho from './assets/fotoCatalogo/Carpa-espelho.jpg';
import imgCarpaCabecuda from './assets/fotoCatalogo/Carpa-cabecuda.jpg';
import imgCarpaHungara from './assets/fotoCatalogo/Carpa-hungara.jpg';
import imgTrairao from './assets/fotoCatalogo/Trairao.jpg';
import imgCatfish from './assets/fotoCatalogo/Catfish.jpg';

const catalogoCompleto = {
  'tilapia': { img: imgTilapia, descricao: 'Peixe muito popular em pesqueiros, resistente e saboroso.' },
  'dourado': { img: imgDourado, descricao: 'Conhecido pela briga intensa, é um dos favoritos dos pescadores.' },
  'carpa': { img: imgCarpa, descricao: 'Peixe resistente e saboroso, muito encontrado em lagos.' },
  'pintado': { img: imgPintado, descricao: 'Espécie ameaçada, símbolo da pesca esportiva brasileira.' },
  'pacu': { img: imgPacu, descricao: 'Peixe de grande porte, muito apreciado pela carne saborosa.' },
  'tambaqui': { img: imgTambaqui, descricao: 'Um dos maiores peixes de escama da Amazônia.' },
  'traira': { img: imgTraira, descricao: 'Peixe ágil e voraz, desafio para qualquer pescador.' },
  'curimbata': { img: imgCurimbata, descricao: 'Peixe de fundo, muito comum em rios e pesqueiros.' },
  'lambari': { img: imgLambari, descricao: 'Pequeno mas abundante, ótimo para pesca com vara simples.' },
  'piau': { img: imgPiau, descricao: 'Peixe de couro muito apreciado no interior do Brasil.' },
  'patinga': { img: imgPatinga, descricao: 'Híbrido entre Pacu e Tambaqui, cresce rápido e briga muito.' },
  'jundia': { img: imgJundia, descricao: 'Peixe de couro muito apreciado no sul do Brasil.' },
  'matrinxa': { img: imgMatrinxa, descricao: 'Peixe veloz e saltador, desafio para pescadores experientes.' },
  'tucunare': { img: imgTucunare, descricao: 'Rei da pesca esportiva, famoso pela agressividade.' },
  'tambacu': { img: imgTambacu, descricao: 'Híbrido entre Tambaqui e Pacu, muito comum em pesqueiros.' },
  'cachara': { img: imgCachara, descricao: 'Peixe muito encontrado no Pantanal e famoso entre pescadores.' },
  'bicuda': { img: imgBicuda, descricao: 'Peixe de água doce conhecido pela velocidade e corpo alongado.' },
  'carpa-capim': { img: imgCarpaCapim, descricao: 'Carpa herbívora, se alimenta de plantas aquáticas.' },
  'carpa-espelho': { img: imgCarpaEspelho, descricao: 'Carpa ornamental com escamas grandes e brilhantes.' },
  'carpa-cabecuda': { img: imgCarpaCabecuda, descricao: 'Carpa de grande porte, conhecida pela cabeça grande.' },
  'carpa-hungara': { img: imgCarpaHungara, descricao: 'Carpa europeia muito comum em pesqueiros brasileiros.' },
  'trairao': { img: imgTrairao, descricao: 'Versão maior da Traíra, muito temida pelos pescadores.' },
  'catfish': { img: imgCatfish, descricao: 'Peixe de couro americano, muito popular na pesca esportiva.' },
};

function PesqueiroDinamico() {
  const location = useLocation();
  const pesqueiro = location.state?.pesqueiro;

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [peixeIndex, setPeixeIndex] = useState(0);

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
    setRating(0); setHoverRating(0); setCommentText('');
    alert('Comentário enviado!');
  };

  const handleDeleteComment = (id) => setComments(prev => prev.filter(c => c.id !== id));
  const isCommentOwner = (comment) => currentUser && comment.nome === currentUser.nome;

  if (!pesqueiro) {
    return (
      <>
        <Navbar />
        <div className="container mt-4 text-center text-white"><h2>Pesqueiro não encontrado.</h2></div>
      </>
    );
  }

  const partes = pesqueiro.informacao ? pesqueiro.informacao.split('|') : [];
  const catalogoPart = partes.find(p => p.startsWith('F:'))?.replace('F:', '') || '';
  const infoRapida = pesqueiro.descricao?.includes(' | ') ? pesqueiro.descricao.split(' | ')[1] || '' : '';
  const descricaoTexto = pesqueiro.descricao?.split(' | ')[0] || '';
  const regrasPermitido = partes.find(p => p.startsWith('P:'))?.replace('P:', '') || '';
  const regrasProibido = partes.find(p => p.startsWith('X:'))?.replace('X:', '') || '';

  const peixes = catalogoPart
    ? catalogoPart.split(',').map(nome => {
        const chave = nome.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const dados = catalogoCompleto[chave];
        return { nome: nome.trim(), img: dados?.img || imgTilapia, descricao: dados?.descricao || 'Peixe disponível neste pesqueiro.' };
      })
    : [];

  const peixeAtual = peixes[peixeIndex];

  return (
    <>
      <Navbar />
      <div className="user-page-content">
      <div style={{ width: '90%', maxWidth: '1200px', margin: '0 auto', paddingTop: '20px' }}>
        <h1 className="text-center mb-4 text-white">{pesqueiro.nome}</h1>

        <div className="info-section mb-5">
          <div className="card info-card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-8">
                  <h2 className="info-title">{pesqueiro.nome}</h2>
                  {descricaoTexto && <p className="info-description">{descricaoTexto}</p>}
                  {infoRapida && <p className="info-highlight">{infoRapida}</p>}
                </div>
                <div className="col-md-4">
                  <div className="info-details">
                    <h5 className="mb-3">Informações Rápidas</h5>
                    {pesqueiro.telefone && <div className="detail-row"><span><strong>Telefone:</strong> {pesqueiro.telefone}</span></div>}
                    {pesqueiro.cep && <div className="detail-row"><span><strong>CEP:</strong> {pesqueiro.cep}</span></div>}
                    {pesqueiro.numero && <div className="detail-row"><span><strong>Número:</strong> {pesqueiro.numero}</span></div>}
                    {pesqueiro.complemento && <div className="detail-row"><span><strong>Complemento:</strong> {pesqueiro.complemento}</span></div>}
                    {pesqueiro.dataCadastro && <div className="detail-row"><span><strong>Cadastrado em:</strong> {pesqueiro.dataCadastro}</span></div>}
                  </div>
                </div>
              </div>
            </div>

            {(regrasPermitido || regrasProibido) && (
              <div className="row mt-4">
                <div className="col-12">
                  <div className="rules-section">
                    <h4 className="rules-title">Regras do Pesqueiro</h4>
                    <div className="row">
                      {regrasPermitido && (
                        <div className="col-md-6">
                          <div className="rules-allowed">
                            <h6>Permitido:</h6>
                            <ul>
                              {regrasPermitido.split('\n').filter(r => r.trim()).map((r, i) => <li key={i}>{r.trim()}</li>)}
                            </ul>
                          </div>
                        </div>
                      )}
                      {regrasProibido && (
                        <div className="col-md-6">
                          <div className="rules-forbidden">
                            <h6>Proibido:</h6>
                            <ul>
                              {regrasProibido.split('\n').filter(r => r.trim()).map((r, i) => <li key={i}>{r.trim()}</li>)}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {peixes.length > 0 && (
          <>
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
                  <button className="btn btn-outline-primary" onClick={() => setPeixeIndex((peixeIndex - 1 + peixes.length) % peixes.length)}>&#8592; Anterior</button>
                  <span className="align-self-center text-muted">{peixeIndex + 1} / {peixes.length}</span>
                  <button className="btn btn-outline-primary" onClick={() => setPeixeIndex((peixeIndex + 1) % peixes.length)}>Próximo &#8594;</button>
                </div>
              </div>
            </div>
          </>
        )}

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
      </div>
    </>
  );
}

export default PesqueiroDinamico;
