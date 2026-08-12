import React, { useEffect, useState } from 'react';
import Navbar from './Componentes/Navbar/Navbar';
import pesqueiro from './assets/imagensPeixes/pesqueiro1home.jpg';
import pesqueiro2 from './assets/imagensPeixes/pesqueiro2home.jpg';
import pesqueiro3 from './assets/imagensPeixes/pesqueiro3home.jpg';
import { Link } from 'react-router-dom';
import PesqueiroService from './services/PesqueiroService';
import './Explorar.css';

const IconeEstrela = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 3.5l2.6 5.4 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.9L12 3.5z" />
  </svg>
);

const IconeRelogio = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

const IconeEtiqueta = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.5 12.5 12 21l-9-9L11.5 3.5H20a1.5 1.5 0 0 1 1.5 1.5v7.5z" />
    <circle cx="16" cy="8" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

const IconeQuiosque = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9l1.5-5h15L21 9" />
    <path d="M4 9v11h16V9" />
    <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
    <path d="M10 20v-5h4v5" />
  </svg>
);

function Home() {
  const [backendPesqueiros, setBackendPesqueiros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPesqueiros = async () => {
      try {
        const response = await PesqueiroService.findAll();
        const data = Array.isArray(response.data) ? response.data : [];

        const normalized = data.map((item, index) => {
          return {
            id: item.id ?? `backend-${index}`,
            nome: item.nome || `Pesqueiro ${index + 1}`,
            imagem: [pesqueiro, pesqueiro2, pesqueiro3][index % 3],
            avaliacao: '4.5',
            horario: item.informacao || 'Consulte o pesqueiro',
            preco: 'Consulte o pesqueiro',
            servicos: item.descricao || 'Serviços não informados',
            pesqueiroData: item,
          };
        });

        setBackendPesqueiros(normalized);
      } catch (error) {
        console.error('Erro ao carregar pesqueiros do backend:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPesqueiros();
  }, []);

  return (
    <div className="explorar-page">
      <Navbar />

      <section className="explorar-hero">
        <h1>Explore os Pesqueiros</h1>
        <p>Descubra os melhores locais para sua pescaria</p>

        <svg className="explorar-waves" viewBox="0 0 1440 110" preserveAspectRatio="none" aria-hidden="true">
          <path fill="rgba(123,205,186,0.35)" d="M0 55c180-35 300 35 480 26s300-60 480-43 300 52 480 34v43H0z" />
          <path fill="#f4f8fb" d="M0 78c200-26 340 22 520 13s320-48 480-31 260 39 440 26v22H0z" />
        </svg>
      </section>

      <section className="explorar-section">
        {loading && (
          <div className="explorar-status">Carregando pesqueiros...</div>
        )}

        {!loading && backendPesqueiros.length === 0 && (
          <div className="explorar-status">Nenhum pesqueiro cadastrado ainda.</div>
        )}

        {!loading && backendPesqueiros.length > 0 && (
          <div className="explorar-grid">
            {backendPesqueiros.map((pesqueiroItem) => (
              <div key={pesqueiroItem.id} className="explorar-card">
                <div className="explorar-card-image">
                  <img src={pesqueiroItem.imagem} alt={pesqueiroItem.nome} />
                  <span className="explorar-card-rating"><IconeEstrela /> {pesqueiroItem.avaliacao}</span>
                  <h3 className="explorar-card-name">{pesqueiroItem.nome}</h3>
                </div>
                <div className="explorar-card-body">
                  <div className="explorar-card-facts">
                    <div className="explorar-card-fact"><IconeRelogio /> {pesqueiroItem.horario}</div>
                    <div className="explorar-card-fact"><IconeEtiqueta /> {pesqueiroItem.preco}</div>
                    <div className="explorar-card-fact"><IconeQuiosque /> {pesqueiroItem.servicos}</div>
                  </div>
                  <Link
                    to="/pesqueiro-dinamico"
                    state={{ pesqueiro: pesqueiroItem.pesqueiroData }}
                    className="explorar-card-btn"
                  >
                    Explorar Pesqueiro
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
