import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Componentes/Navbar/Navbar';
import UsuarioService from './services/UsuarioService';
import FavoritoService from './services/FavoritoService';
import HistoricoService from './services/HistoricoService';
import './Perfil.css';

const IconeUsuario = () => (
  <svg className="perfil-avatar-placeholder" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconeCamera = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
    <circle cx="12" cy="14" r="3.5" />
  </svg>
);

// Redimensiona a imagem no navegador antes de enviar, pra não mandar um arquivo gigante pro banco.
const redimensionarImagem = (file, tamanhoMax = 320, qualidade = 0.8) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const escala = Math.min(1, tamanhoMax / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = img.width * escala;
        canvas.height = img.height * escala;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', qualidade));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

const soBase64 = (dataUrl) => dataUrl.split(',')[1] || '';

function Perfil() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [profileData, setProfileData] = useState({ nome: '', email: '' });
  const [fotoPreview, setFotoPreview] = useState(null);
  const [enviandoFoto, setEnviandoFoto] = useState(false);
  const [favoritos, setFavoritos] = useState([]);
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const loadUser = () => {
      const user = UsuarioService.getCurrentUser();
      if (user) {
        setUsuario(user);
        setProfileData({ nome: user.nome, email: user.email });
      }
    };

    loadUser();

    const handleStorageChange = () => loadUser();
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (!usuario) return;
    FavoritoService.listar().then((res) => setFavoritos(res.data)).catch((err) => console.error('Erro ao carregar favoritos', err));
    HistoricoService.listar().then((res) => setHistorico(res.data)).catch((err) => console.error('Erro ao carregar histórico', err));
  }, [usuario]);

  const handleRemoverFavorito = (pesqueiroId) => {
    FavoritoService.desfavoritar(pesqueiroId)
      .then(() => setFavoritos((prev) => prev.filter((p) => p.id !== pesqueiroId)))
      .catch((err) => {
        console.error('Erro ao remover favorito', err);
        alert('Não foi possível remover o favorito.');
      });
  };

  const handleSave = async () => {
    try {
      const atualizado = await UsuarioService.update(usuario.id, {
        ...usuario,
        nome: profileData.nome,
        email: profileData.email,
      });
      const novosDados = atualizado.data;
      localStorage.setItem('user', JSON.stringify(novosDados));
      setUsuario(novosDados);
      setProfileData({ nome: novosDados.nome, email: novosDados.email });
      setIsEditing(false);
      alert('Perfil atualizado com sucesso!');
    } catch (err) {
      alert('Erro ao atualizar perfil.');
    }
  };

  const handleFotoSelecionada = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    try {
      const dataUrl = await redimensionarImagem(file);
      setFotoPreview(dataUrl);
      setEnviandoFoto(true);
      const atualizado = await UsuarioService.update(usuario.id, {
        ...usuario,
        foto: soBase64(dataUrl),
      });
      const novosDados = atualizado.data;
      localStorage.setItem('user', JSON.stringify(novosDados));
      setUsuario(novosDados);
    } catch (err) {
      console.error('Erro ao atualizar foto:', err);
      console.error('Status:', err.response?.status);
      console.error('Resposta do servidor:', err.response?.data);
      console.error('Tamanho do body enviado (bytes):', JSON.stringify({ ...usuario, foto: 'x' }).length);
      alert('Não foi possível atualizar a foto. Tente uma imagem menor.');
      setFotoPreview(null);
    } finally {
      setEnviandoFoto(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      return;
    }
    try {
      await UsuarioService.remove(usuario.id);
      localStorage.removeItem('user');
      setUsuario(null);
      setProfileData({ nome: '', email: '' });
      alert('Conta excluída com sucesso.');
      navigate('/login');
    } catch (err) {
      alert('Erro ao excluir conta. Tente novamente.');
    }
  };

  if (!usuario) {
    return (
      <div className="perfil-page">
        <Navbar />
        <div className="perfil-card">
          <div className="perfil-card-inner text-center">
            <p className="mb-0">Você precisa estar logado para ver o perfil.</p>
          </div>
        </div>
      </div>
    );
  }

  const fotoAtual = fotoPreview || (usuario.foto ? `data:image/jpeg;base64,${usuario.foto}` : null);

  return (
    <div className="perfil-page">
      <Navbar />

      <div className="perfil-cover">
        <svg className="perfil-waves" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
          <path fill="rgba(123,205,186,0.35)" d="M0 45c180-30 300 30 480 22s300-52 480-37 300 45 480 30v30H0z" />
          <path fill="#f4f8fb" d="M0 65c200-22 340 18 520 11s320-40 480-26 260 33 440 22v20H0z" />
        </svg>
      </div>

      <div className="perfil-header">
        <div className="perfil-avatar-wrap">
          <div className="perfil-avatar">
            {fotoAtual ? <img src={fotoAtual} alt={profileData.nome} /> : <IconeUsuario />}
          </div>
          <button
            type="button"
            className="perfil-avatar-edit"
            onClick={() => fileInputRef.current?.click()}
            disabled={enviandoFoto}
            title="Alterar foto"
          >
            <IconeCamera />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="perfil-avatar-input"
            onChange={handleFotoSelecionada}
          />
        </div>

        <h2 className="perfil-name">{profileData.nome}</h2>
        <span className="perfil-badge">
          {usuario.nivelAcesso === 'admin' ? 'Dono de Pesqueiro' : 'Pescador'}
        </span>
      </div>

      <div className="perfil-card">
        <div className="perfil-card-inner">
          {isEditing ? (
            <div>
              <div className="perfil-field">
                <label className="perfil-field-label">Nome</label>
                <input
                  type="text"
                  className="perfil-input"
                  value={profileData.nome}
                  onChange={(e) => setProfileData({ ...profileData, nome: e.target.value })}
                />
              </div>
              <div className="perfil-field">
                <label className="perfil-field-label">Email</label>
                <input
                  type="email"
                  className="perfil-input"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                />
              </div>
              <div className="perfil-actions">
                <button className="perfil-btn perfil-btn-primary" onClick={handleSave}>Salvar</button>
                <button className="perfil-btn perfil-btn-ghost" onClick={() => setIsEditing(false)}>Cancelar</button>
              </div>
            </div>
          ) : (
            <div>
              <div className="perfil-field">
                <span className="perfil-field-label">Nome</span>
                <span className="perfil-field-value">{profileData.nome}</span>
              </div>
              <div className="perfil-field">
                <span className="perfil-field-label">Email</span>
                <span className="perfil-field-value">{profileData.email}</span>
              </div>
              <div className="perfil-field">
                <span className="perfil-field-label">Tipo de conta</span>
                <span className="perfil-field-value">{usuario.nivelAcesso === 'admin' ? 'Dono de Pesqueiro' : 'Pescador'}</span>
              </div>
              <div className="perfil-field">
                <span className="perfil-field-label">Membro desde</span>
                <span className="perfil-field-value">{usuario.dataCadastro}</span>
              </div>

              <div className="perfil-actions">
                <button className="perfil-btn perfil-btn-primary" onClick={() => setIsEditing(true)}>Editar perfil</button>
              </div>

              <div className="perfil-danger-zone">
                <p>Excluir sua conta é permanente e não pode ser desfeito.</p>
                <button className="perfil-btn perfil-btn-danger" style={{ flex: '0 0 auto', padding: '0 28px' }} onClick={handleDelete}>
                  Excluir conta
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="perfil-card">
        <div className="perfil-card-inner">
          <h5 style={{ marginBottom: '16px' }}>Pesqueiros favoritos ({favoritos.length})</h5>
          {favoritos.length === 0 && <p className="perfil-field-value">Você ainda não favoritou nenhum pesqueiro.</p>}
          {favoritos.map((p) => (
            <div key={p.id} className="perfil-field" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link to="/pesqueiro-dinamico" state={{ pesqueiro: p }} className="perfil-field-value">{p.nome}</Link>
              <button type="button" className="perfil-btn perfil-btn-ghost" style={{ padding: '4px 14px', height: 'auto' }} onClick={() => handleRemoverFavorito(p.id)}>
                Remover
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="perfil-card">
        <div className="perfil-card-inner">
          <h5 style={{ marginBottom: '16px' }}>Histórico de pesqueiros visitados ({historico.length})</h5>
          {historico.length === 0 && <p className="perfil-field-value">Você ainda não visitou nenhum pesqueiro.</p>}
          {historico.map((p) => (
            <div key={p.id} className="perfil-field">
              <Link to="/pesqueiro-dinamico" state={{ pesqueiro: p }} className="perfil-field-value">{p.nome}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Perfil;
