import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Componentes/Navbar/Navbar';
import ComentarioService from './services/ComentarioService';
import UsuarioService from './services/UsuarioService';
import './Detalhe.css';

const IconeTelefone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.5 2.9.6a2 2 0 0 1 1.7 2.1z" />
  </svg>
);

const IconePin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

const IconeCalendario = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M8 3v4M16 3v4M3 10h18" />
  </svg>
);

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

  const carregarComentarios = () => {
    if (!pesqueiro?.id) return;
    Promise.all([
      ComentarioService.findByPesqueiro(pesqueiro.id),
      UsuarioService.findAll(),
    ]).then(([comentariosRes, usuariosRes]) => {
      const nomesPorId = {};
      usuariosRes.data.forEach((u) => { nomesPorId[u.id] = u.nome; });
      const mapeados = comentariosRes.data.map((c) => ({
        id: c.id,
        usuarioId: c.usuarioId,
        nome: nomesPorId[c.usuarioId] || 'Usuário',
        rating: c.nota,
        texto: c.descricao,
        data: c.dataCadastro,
      }));
      setComments(mapeados);
    }).catch((err) => console.error('Erro ao carregar comentários', err));
  };

  useEffect(() => {
    carregarComentarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pesqueiro?.id]);

  const renderStars = (count) => Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < count ? '#f0b429' : '#d8dfe8', fontSize: '1rem' }}>★</span>
  ));

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Você precisa estar logado para comentar.');
      return;
    }
    if (!rating || !commentText.trim()) {
      alert('Por favor, selecione a avaliação e escreva sua experiência.');
      return;
    }
    const hoje = new Date();
    const dataCadastro = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;
    ComentarioService.criar({
      descricao: commentText.trim(),
      pesqueiroId: pesqueiro.id,
      usuarioId: currentUser.id,
      dataCadastro,
      nota: rating,
    }).then(() => {
      setRating(0); setHoverRating(0); setCommentText('');
      carregarComentarios();
    }).catch((err) => {
      console.error('Erro ao enviar comentário', err);
      alert('Não foi possível enviar o comentário. Tente novamente.');
    });
  };

  const handleDeleteComment = (id) => {
    ComentarioService.remove(id).then(() => {
      setComments((prev) => prev.filter((c) => c.id !== id));
    }).catch((err) => {
      console.error('Erro ao excluir comentário', err);
      alert('Não foi possível excluir o comentário.');
    });
  };
  const isCommentOwner = (comment) => currentUser && comment.usuarioId === currentUser.id;

  if (!pesqueiro) {
    return (
      <div className="detalhe-page">
        <Navbar />
        <div className="detalhe-not-found"><h2>Pesqueiro não encontrado.</h2></div>
      </div>
    );
  }

  const partes = pesqueiro.informacao ? pesqueiro.informacao.split('|') : [];
  const catalogoPart = pesqueiro.descricao?.split(' | ').find(p => p.startsWith('F:'))?.replace('F:', '') || '';
  const infoRapida = pesqueiro.descricao?.split(' | ').find(p => p.startsWith('Info:'))?.replace('Info:', '') || '';
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
    <div className="detalhe-page">
      <Navbar />

      <section className="detalhe-hero">
        <h1>{pesqueiro.nome}</h1>
        <svg className="detalhe-waves" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
          <path fill="rgba(123,205,186,0.35)" d="M0 50c180-32 300 32 480 24s300-55 480-39 300 47 480 31v39H0z" />
          <path fill="#f4f8fb" d="M0 71c200-24 340 20 520 12s320-44 480-28 260 35 440 24v20H0z" />
        </svg>
      </section>

      <div className="detalhe-content">
        <div className="detalhe-card">
          <div className="detalhe-info-grid">
            <div>
              <h2>{pesqueiro.nome}</h2>
              {descricaoTexto && <p className="detalhe-description">{descricaoTexto}</p>}
              {infoRapida && <p className="detalhe-highlight">{infoRapida}</p>}
            </div>
            <div className="detalhe-quickinfo">
              <h5>Informações Rápidas</h5>
              {pesqueiro.telefone && (
                <div className="detalhe-quickinfo-row"><IconeTelefone /><span><strong>Telefone:</strong> {pesqueiro.telefone}</span></div>
              )}
              {pesqueiro.cep && (
                <div className="detalhe-quickinfo-row"><IconePin /><span><strong>CEP:</strong> {pesqueiro.cep}</span></div>
              )}
              {pesqueiro.numero && (
                <div className="detalhe-quickinfo-row"><IconePin /><span><strong>Número:</strong> {pesqueiro.numero}</span></div>
              )}
              {pesqueiro.complemento && (
                <div className="detalhe-quickinfo-row"><IconePin /><span><strong>Complemento:</strong> {pesqueiro.complemento}</span></div>
              )}
              {pesqueiro.dataCadastro && (
                <div className="detalhe-quickinfo-row"><IconeCalendario /><span><strong>Cadastrado em:</strong> {pesqueiro.dataCadastro}</span></div>
              )}
            </div>
          </div>

          {(regrasPermitido || regrasProibido) && (
            <div style={{ marginTop: '26px' }}>
              <h2 style={{ fontSize: '1.15rem', textAlign: 'center' }}>Regras do Pesqueiro</h2>
              <div className="detalhe-rules-grid">
                {regrasPermitido && (
                  <div className="detalhe-rules-col is-allowed">
                    <h6>Permitido</h6>
                    <ul>
                      {regrasPermitido.split('\n').filter(r => r.trim()).map((r, i) => <li key={i}>{r.trim()}</li>)}
                    </ul>
                  </div>
                )}
                {regrasProibido && (
                  <div className="detalhe-rules-col is-forbidden">
                    <h6>Proibido</h6>
                    <ul>
                      {regrasProibido.split('\n').filter(r => r.trim()).map((r, i) => <li key={i}>{r.trim()}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {peixes.length > 0 && (
          <div className="detalhe-card">
            <h2>Peixes Disponíveis</h2>
            <div className="detalhe-fish">
              <img src={peixeAtual.img} alt={peixeAtual.nome} />
              <div className="detalhe-fish-info">
                <h4>{peixeAtual.nome}</h4>
                <p>{peixeAtual.descricao}</p>
              </div>
            </div>
            <div className="detalhe-fish-nav">
              <button className="detalhe-fish-nav-btn" onClick={() => setPeixeIndex((peixeIndex - 1 + peixes.length) % peixes.length)}>&#8592; Anterior</button>
              <span className="detalhe-fish-nav-count">{peixeIndex + 1} / {peixes.length}</span>
              <button className="detalhe-fish-nav-btn" onClick={() => setPeixeIndex((peixeIndex + 1) % peixes.length)}>Próximo &#8594;</button>
            </div>
          </div>
        )}

        <div className="detalhe-card">
          <h2>Comentários</h2>
          <form onSubmit={handleCommentSubmit}>
            <p className="detalhe-comment-you"><strong>Comentário como:</strong> {authorName}</p>

            <div className="detalhe-stars-input">
              {[1, 2, 3, 4, 5].map((value) => (
                <button key={value} type="button" onClick={() => setRating(value)}
                  onMouseEnter={() => setHoverRating(value)} onMouseLeave={() => setHoverRating(0)}
                  style={{ color: value <= (hoverRating || rating) ? '#f0b429' : '#d8dfe8' }}>★</button>
              ))}
            </div>
            {rating === 0 && <small style={{ color: 'var(--text-soft)' }}>Clique nas estrelas para avaliar.</small>}

            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="detalhe-textarea"
              style={{ marginTop: '12px' }}
              placeholder="Sua experiência..."
              required
            />
            <button type="submit" className="detalhe-comment-submit">Enviar</button>
          </form>

          <div className="detalhe-comment-list">
            <h5>Comentários ({comments.length})</h5>
            {comments.map((comment) => (
              <div key={comment.id} className="detalhe-comment-item">
                <div className="detalhe-comment-head">
                  <div>
                    <span className="detalhe-comment-name">{comment.nome}</span>
                    <div>{renderStars(comment.rating)}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="detalhe-comment-date">{comment.data}</span>
                    {isCommentOwner(comment) && (
                      <button type="button" className="detalhe-comment-delete" onClick={() => handleDeleteComment(comment.id)}>Excluir</button>
                    )}
                  </div>
                </div>
                <p className="detalhe-comment-text">{comment.texto}</p>
              </div>
            ))}
            {comments.length === 0 && <p className="detalhe-empty">Nenhum comentário ainda.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PesqueiroDinamico;
