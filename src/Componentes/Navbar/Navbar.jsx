import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="admin-header">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center py-3">
          <div>
            <h2 className="mb-1">Smart Fishing</h2>
            <p className="text-muted mb-0">Plataforma de <strong>Pesqueiros</strong></p>
            <small className="text-success">Sistema Online</small>
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
              <Link to="/sobre" className="btn btn-outline-primary me-2" title="Sobre nós">
                Sobre
              </Link>
              <Link to="/contato" className="btn btn-outline-primary me-2" title="Entre em contato">
                Contato
              </Link>
              <Link to="/perfil" className="btn btn-outline-primary me-2" title="Meu perfil">
                Perfil
              </Link>
              <Link to="/login" className="btn btn-outline-danger" title="Fazer login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
