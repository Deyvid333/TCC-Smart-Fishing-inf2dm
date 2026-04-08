import React, { useState, useEffect } from 'react';
import Navbar from './Componentes/Navbar/Navbar';
import './App.css';
import UsuarioService from './services/UsuarioService';

function Perfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [profileData, setProfileData] = useState({ nome: '', email: '' });

  useEffect(() => {
    const user = UsuarioService.getCurrentUser();
    if (user) {
      setUsuario(user);
      setProfileData({ nome: user.nome, email: user.email });
    }
  }, []);

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
      setIsEditing(false);
      alert('Perfil atualizado com sucesso!');
    } catch (err) {
      alert('Erro ao atualizar perfil.');
    }
  };

  if (!usuario) {
    return (
      <>
        <Navbar />
        <div className="user-page-content">
          <div className="container mt-4 text-center">
            <p>Você precisa estar logado para ver o perfil.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="user-page-content">
        <div style={{ width: '70%', margin: '2rem auto' }}>
          <h2 className="text-center mb-5">Meu Perfil</h2>
          <div className="card admin-main-card">
            <div className="card-body p-5">

              <div className="text-center mb-4">
                <div style={{ fontSize: '4rem' }}>👤</div>
                <h4 className="mt-2">{profileData.nome}</h4>
                <span className="badge bg-primary">
                  {usuario.nivelAcesso === 'admin' ? 'Dono de Pesqueiro' : 'Pescador'}
                </span>
              </div>

              {isEditing ? (
                <div>
                  <div className="mb-3">
                    <label className="form-label"><strong>Nome:</strong></label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileData.nome}
                      onChange={(e) => setProfileData({ ...profileData, nome: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label"><strong>Email:</strong></label>
                    <input
                      type="email"
                      className="form-control"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-success w-100" onClick={handleSave}>Salvar</button>
                    <button className="btn btn-secondary w-100" onClick={() => setIsEditing(false)}>Cancelar</button>
                  </div>
                </div>
              ) : (
                <div>
                  <p><strong>Nome:</strong> {profileData.nome}</p>
                  <p><strong>Email:</strong> {profileData.email}</p>
                  <p><strong>Tipo de conta:</strong> {usuario.nivelAcesso === 'admin' ? 'Dono de Pesqueiro' : 'Pescador'}</p>
                  <p><strong>Membro desde:</strong> {usuario.dataCadastro}</p>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Perfil;
