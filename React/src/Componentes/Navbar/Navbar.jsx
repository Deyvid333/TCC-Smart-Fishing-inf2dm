import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UsuarioService from '../../services/UsuarioService';

const Navbar = () => {
  const navigate = useNavigate();
  const usuario = UsuarioService.getCurrentUser();
  const isAdmin = usuario?.nivelAcesso?.toUpperCase() === 'ADMIN';

  const handleLogout = () => {
    UsuarioService.logout();
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  return (
    <div className="admin-header">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center py-3">
          <div>
            <h2 className="mb-1">Smart Fishing</h2>

          </div>
          <div className="d-flex align-items-center gap-2">
            <input
              className="form-control me-3"
              placeholder="Buscar pesqueiros"
              style={{width: '250px'}}
            />
            <div className="admin-nav">
              <Link to="/inicial" className="btn btn-outline-primary me-2" title="Página inicial">
                Inicial
              </Link>
              <Link to="/pesqueiros" className="btn btn-outline-primary me-2" title="Explorar pesqueiros">
                Pesqueiros
              </Link>
              {usuario && !isAdmin && (
                <Link to="/indique-pesqueiro" className="btn btn-outline-primary me-2" title="Indique seu pesqueiro">
                  Indique seu pesqueiro
                </Link>
              )}
              {isAdmin && (
                <Link to="/admin" className="btn btn-outline-primary me-2" title="Moderação">
                  Moderação
                </Link>
              )}
              {usuario && (
                <Link to="/perfil" className="btn btn-outline-primary me-2" title="Meu perfil">
                  Perfil
                </Link>
              )}
              {usuario ? (
                <button type="button" className="btn btn-outline-danger" onClick={handleLogout} title="Sair">
                  Sair
                </button>
              ) : (
                <Link to="/login" className="btn btn-outline-danger" title="Fazer login">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
