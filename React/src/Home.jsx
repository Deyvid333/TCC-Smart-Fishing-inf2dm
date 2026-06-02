import React, { useEffect, useState } from 'react';
import Navbar from './Componentes/Navbar/Navbar';
import pesqueiro from './assets/imagensPeixes/pesqueiro1home.jpg';
import pesqueiro2 from './assets/imagensPeixes/pesqueiro2home.jpg';
import pesqueiro3 from './assets/imagensPeixes/pesqueiro3home.jpg';
import { Link } from 'react-router-dom';
import PesqueiroService from './services/PesqueiroService';
import './App.css';

const samplePesqueiros = [
  {
    id: 'sample-1',
    nome: 'Pesqueiro Águas Claras',
    imagem: pesqueiro,
    avaliacao: '4.7',
    horario: '8h às 22h30',
    preco: 'R$18 (úteis) | R$25 (fins de semana)',
    servicos: 'Restaurante, quiosque, estacionamento',
    link: '/Pesqueiro',
  },
  {
    id: 'sample-2',
    nome: 'Pesqueiro Lago do Pescador',
    imagem: pesqueiro2,
    avaliacao: '4.3',
    horario: '8h às 19h',
    preco: 'R$20 por dia',
    servicos: 'Restaurante, peixes frescos',
    link: '/Pesqueiro2',
  },
  {
    id: 'sample-3',
    nome: 'Lago da Rocha do Norte',
    imagem: pesqueiro3,
    avaliacao: '4.7',
    horario: 'Aberto 24h',
    preco: 'R$15 por dia',
    servicos: 'Quiosque, estacionamento',
    link: '/Pesqueiro3',
  },
];

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
            link: '/pesqueiro-dinamico',
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

  const pesqueiros = [...samplePesqueiros, ...backendPesqueiros];

  return (
    <>
      <Navbar />
      <div className="user-page-content">
        <div className="pesqueiros-hero">
          <div className="container text-center">
            <h1 className="hero-title">Explore os Pesqueiros</h1>
            <p className="hero-subtitle">Descubra os melhores locais para sua pescaria</p>
          </div>
        </div>

        <div className="pesqueiros-map-section">
          <div className="container">
            <h2 className="section-title text-center mb-5">Pesqueiros Disponíveis</h2>
            {loading && (
              <div className="text-center mb-4 text-white">Carregando pesqueiros...</div>
            )}
            <div className="row g-4">
              {pesqueiros.map((pesqueiroItem, index) => (
                <div key={pesqueiroItem.id ?? index} className="col-lg-4 col-md-6">
                  <div className="card h-100">
                    <div className="position-relative">
                      <img
                        src={pesqueiroItem.imagem}
                        className="card-img-top"
                        alt={pesqueiroItem.nome}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <span className="position-absolute top-0 end-0 m-2 badge bg-primary">
                        {pesqueiroItem.avaliacao}
                      </span>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{pesqueiroItem.nome}</h5>
                      <div className="mb-3 flex-grow-1">
                        <p className="mb-2">{pesqueiroItem.horario}</p>
                        <p className="mb-2">{pesqueiroItem.preco}</p>
                        <p className="mb-0">{pesqueiroItem.servicos}</p>
                      </div>
                      <Link
                        to={pesqueiroItem.pesqueiroData ? '/pesqueiro-dinamico' : pesqueiroItem.link}
                        state={pesqueiroItem.pesqueiroData ? { pesqueiro: pesqueiroItem.pesqueiroData } : undefined}
                        className="btn btn-primary mt-auto"
                      >
                        Explorar Pesqueiro
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

