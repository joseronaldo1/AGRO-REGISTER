// components/organismos/NavbarHeader.js
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import NavItem from '../../moleculas/Sidebar/NavItem'; // Importa el componente NavItem del Sidebar
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

  return (
    <>
      <nav className="navbar bg-#00800 fixed-top p-1">
        <div className="d-flex container align-items-center">
          <button className="btn shadow-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span><FaBars style={{ width: "40px", height: "40px", borderColor: '#009100' }} /></span>
          </button>
          <h1>AGRO-REGISTER</h1>
          <div className="d-flex align-items-center">
            <img className='imagenpersonal' src={v.Imagepersona} alt="Imagen 2" style={{ width: '100px', objectFit: 'cover', height: '100%' }} onClick={handleModalOpen} />
            <strong><span style={{ marginLeft: '10px', fontSize: '20px', marginRight: '50px', cursor: 'pointer' }} onClick={handleModalOpen}>Sergio C</span></strong>
          </div>
        </div>
      </nav>

      <Modal dialogClassName="modal-sm" show={showModal} onHide={handleModalClose} backdrop={false} style={{ marginLeft: '400px', marginTop: '70px' }}>
        <Modal.Header closeButton>
          <Modal.Title>Información</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ marginBottom: '10px', marginRight: '20px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2em' }}>
            <p>Visita tu perfil:</p>
          </div>
          {/* Aquí comienza el uso de los elementos del Sidebar */}
          <NavItem icon={v.iconoPerfilUsuario} text="Perfil" href="/Perfilprincipal" className="perfil" />
          <div style={{ marginBottom: '10px', marginRight: '20px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2em' }}>
            <p>Configura tu cuenta:</p>
          </div>
          <NavItem icon={v.iconoSoporte} text="Soporte" href="/soport" className="soporte" />
          <div style={{ marginBottom: '10px', marginRight: '20px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2em' }}>
            <p>¿Deseas cerrar sesión?</p>
          </div>
          <NavItem icon={v.iconoSalir} text="Salir" href="/" className="salir" />
          {/* Aquí termina el uso de los elementos del Sidebar */}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavbarHeader;
