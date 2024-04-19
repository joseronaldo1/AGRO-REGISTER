import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa'; 
import { Modal } from 'react-bootstrap';
import Boton from "../../atomos/BotonSalir";
import Botones from "../../atomos/BotonesPerfil"; // Importa el componente de botones personalizado
import './Navbar.css';
import v from '../../../styles/variables';

function NavbarHeader() {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handlePerfil = () => {
    // Lógica para ir al perfil
    console.log("Redireccionando al perfil...");
  };

  const handleSoporte = () => {
    // Lógica para ir al soporte
    console.log("Redireccionando al soporte...");
  };

  const handleCerrarSesion = () => {
    // Lógica para cerrar sesión
    console.log("Cerrando sesión...");
  };

  return (
    <>
      <nav className="navbar bg-#00800 fixed-top p-1">
        <div className="d-flex container align-items-center">
          <button className="btn shadow-none navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span><FaBars style={{ width: "40px", height: "40px", borderColor: '#009100' }} /></span>
          </button>
          <h1>AGRO-REGISTER</h1>
          <div className="d-flex align-items-center">
            <img className='imagenpersonal' src={v.Imagepersona} alt="Imagen 2" style={{ width: '100px', objectFit: 'cover', height: '100%' }} onClick={handleModalOpen} />
            <strong><span style={{ marginLeft: '10px', fontSize: '20px', marginRight:'50px' }}>Sergio C</span></strong>
          </div>
        </div>
      </nav>

      <Modal dialogClassName="modal-sm" show={showModal} onHide={handleModalClose} backdrop={false} style={{ marginLeft: '490px', marginTop: '70px' }}>
        <Modal.Header closeButton>
          <Modal.Title>Información</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ marginBottom: '10px', marginRight: '20px', textAlign: 'center', fontWeight: 'bold' }}>
            <p>Visita tu perfil</p>
          </div>
          <div style={{ marginBottom: '10px', marginLeft: '70px' }}> {/* Div para separar el primer botón */}
            <Botones onClick={handlePerfil} children="Perfil" href="/Perfilprincipal" /> {/* Botón para ir al perfil */}
          </div>
          <div style={{ marginBottom: '10px', marginRight: '20px', textAlign: 'center', fontWeight: 'bold' }}>
            <p>Configura tu cuenta:</p>
          </div>
          <div style={{ marginBottom: '10px', marginLeft: '70px' }}> {/* Div para separar el segundo botón */}
            <Botones onClick={handleSoporte} children="Soporte" tipo="secundario" href="/Soport" /> {/* Botón para soporte */}
          </div>
        <div>
          <div style={{ marginBottom: '10px', marginRight: '20px', textAlign: 'center', fontWeight: 'bold' }}>
            <p>¿Deseas cerrar sesión?</p>
          </div>
          <div style={{ marginBottom: '10px', marginLeft: '70px' }}> {/* Div para separar el tercer botón */}
            <Boton onClick={handleCerrarSesion} children="Salir" tipo="secundario" href="/iniciosesion" />
          </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavbarHeader;
