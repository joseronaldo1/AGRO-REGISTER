import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import NavItem from '../../moleculas/Sidebar/NavItem';
import axios from 'axios';
import './Navbar.css';
import v from '../../../styles/variables';

function NavbarHeader() {
  const [showModal, setShowModal] = useState(false);
  const [ultimoUsuario, setUltimoUsuario] = useState(null);

  useEffect(() => {
    // Función para obtener el último usuario registrado
    const obtenerUltimoUsuario = () => {
      axios.get('http://localhost:3000/listarUsuario')
        .then(response => {
          const ultimo = response.data[response.data.length - 1];
          setUltimoUsuario(ultimo);
        })
        .catch(error => {
          console.error('Error al obtener el último usuario:', error);
        });
    };

    obtenerUltimoUsuario();


    const interval = setInterval(obtenerUltimoUsuario, 300);


    return () => clearInterval(interval);
  }, []);

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
            {ultimoUsuario && <strong><span style={{ marginLeft: '10px', fontSize: '20px', marginRight: '50px', cursor: 'pointer' }} onClick={handleModalOpen}>{ultimoUsuario.nombre}</span></strong>}
          </div>
        </div>
      </nav>


      <Modal dialogClassName="modal-sm" show={showModal} onHide={handleModalClose} backdrop={false} style={{ marginLeft: '28%', marginTop: '70px' }}>
        <Modal.Header closeButton>
          <Modal.Title>Información</Modal.Title>
        </Modal.Header>
        <Modal.Body>


          <div style={{ marginBottom: '10px', marginRight: '20px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2em' }}>
            <p>Visita tu perfil:</p>
          </div>
          <NavItem icon={v.iconoPerfilUsuario} text="Perfil" href="/Perfilprincipal" className="perfil" />


          <div style={{ marginBottom: '10px', marginRight: '20px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2em' }}>
            <p>¿Deseas cerrar sesión?</p>
          </div>
          <NavItem icon={v.iconoSalir} text="Salir" href="/" className="salir" />


        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavbarHeader;
