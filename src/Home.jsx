import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Componentes/Navbar/Navbar';
import PesqueiroService from './services/PesqueiroService';
import fallbackImage from './assets/imagensPeixes/pesqueiro1home.jpg';
import './App.css';

const samplePesqueiros = [
  {
    id: 'sample-1',
    nome: 'Pesqueiro Lago Azul',
    telefone: '(11) 99876-5432',
    descricao: 'Pesqueiro familiar com estrutura completa e clima tranquilo para toda a família.',
    informacao: JSON.stringify({
      detalhamento: 'Horário: 8h às 19h\nPreço: R$ 35 por pessoa\nServiços: Restaurante, quiosques e estacionamento',
      catalogoPeixes: ['Pacu', 'Pintado', 'Tilápia', 'Dourado'],
      regrasPermitido: ['Entrada de crianças acompanhadas', 'Cooler e lanches próprios', 'Pesca com equipamento próprio'],
      regrasProibido: ['Pesca noturna fora do horário', 'Som alto após 22h', 'Lixo nas margens'],
    }),
    cep: '01234-567',
    numero: '128',
    complemento: 'Rua das Traíras, junto ao lago',
    statusPesqueiro: true,
    isSample: true,
  },
  {
    id: 'sample-2',
    nome: 'Pesqueiro Terra Serena',
    telefone: '(11) 98765-4321',
    descricao: 'Local cercado por natureza, ideal para pescaria com amigos e descanso à beira d’água.',
    informacao: JSON.stringify({
      detalhamento: 'Horário: 7h às 20h\nPreço: R$ 29 por pessoa\nServiços: Quiosques e lanchonete',
      catalogoPeixes: ['Carpa', 'Tambaqui', 'Pintado'],
      regrasPermitido: ['Entrada de famílias', 'Uso de isca artificial', 'Estacionamento gratuito'],
      regrasProibido: ['Acampamento livre', 'Fogueiras próximas ao lago', 'Pesca com redes grandes'],
    }),
    cep: '02345-678',
    numero: '210',
    complemento: 'Avenida dos Pescadores',
    statusPesqueiro: true,
    isSample: true,
  },
  {
    id: 'sample-3',
    nome: 'Pesqueiro Pedra Dourada',
    telefone: '(11) 96543-2109',
    descricao: 'Pesqueiro rústico com ótimas atrações para quem quer pescar e relaxar em um ambiente natural.',
    informacao: JSON.stringify({
      detalhamento: 'Horário: 9h às 18h\nPreço: R$ 25 por pessoa\nServiços: Estrutura de churrasco e passeio de barco',
      catalogoPeixes: ['Bicuda', 'Piau', 'Tilápia'],
      regrasPermitido: ['Pesca com anzol simples', 'Entrada de crianças', 'Uso de cooler pessoal'],
      regrasProibido: ['Ruído excessivo', 'Uso de explosivos', 'Despejo de lixo na água'],
    }),
    cep: '03456-789',
    numero: '56',
    complemento: 'Estrada do Mirante',
    statusPesqueiro: true,
    isSample: true,
  },
];

function Home() {
  const [pesqueiros, setPesqueiros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const carregarPesqueiros = async () => {
      try {
        const response = await PesqueiroService.findAll();
        const pesqueirosReais = response.data.filter((item) => item.statusPesqueiro !== false);
        setPesqueiros([...samplePesqueiros, ...pesqueirosReais]);
      } catch (error) {
        setErro('Não foi possível carregar os pesqueiros do servidor.');
        setPesqueiros(samplePesqueiros);
      } finally {
        setLoading(false);
      }
    };

    carregarPesqueiros();
  }, []);

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

            {loading && <p className="text-center">Carregando pesqueiros...</p>}
            {erro && <div className="alert alert-danger">{erro}</div>}

            {!loading && !erro && pesqueiros.length === 0 && (
              <div className="alert alert-info text-center">
                Nenhum pesqueiro cadastrado ainda.
              </div>
            )}

            <div className="row g-4">
              {pesqueiros.map((pesqueiro) => (
                <div key={pesqueiro.id} className="col-lg-4 col-md-6">
                  <div className="card h-100">
                    <div className="position-relative">
                      <img
                        src={fallbackImage}
                        className="card-img-top"
                        alt={pesqueiro.nome}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <span className="position-absolute top-0 end-0 m-2 badge bg-primary">
                        Online
                      </span>
                    </div>

                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{pesqueiro.nome}</h5>
                      <div className="mb-3 flex-grow-1">
                        <p className="mb-2">{pesqueiro.descricao || 'Pesqueiro cadastrado na Smart Fishing.'}</p>
                        <p className="mb-2">
                          <strong>Telefone:</strong> {pesqueiro.telefone || 'Não informado'}
                        </p>
                        <p className="mb-0">
                          <strong>Local:</strong> CEP {pesqueiro.cep || 'não informado'}
                          {pesqueiro.numero ? `, ${pesqueiro.numero}` : ''}
                        </p>
                      </div>

                      <Link to={`/pesqueiro/${pesqueiro.id}`} className="btn btn-primary mt-auto">
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
