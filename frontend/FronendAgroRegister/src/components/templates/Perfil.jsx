import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../organismos/Header/Header";
import Footer from '../organismos/Footer/Footer';
import Botones from "../atomos/BotonRegiApi.jsx";
import { Modal, Button } from 'react-bootstrap';

const EditarPerfilUsuarioPage = () => {
    const [ultimoUsuario, setUltimoUsuario] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editedUsuario, setEditedUsuario] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        rol: ''
    });

    useEffect(() => {
        axios.get('http://localhost:3000/listarusuario')
            .then(response => {
                const ultimo = response.data[response.data.length - 1];
                setUltimoUsuario(ultimo);
                setEditedUsuario(ultimo);
            })
            .catch(error => {
                console.error('Error al obtener los usuarios:', error);
            });
    }, []);

    const handleUpdate = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedUsuario({ ...editedUsuario, [name]: value });
    };

    const handleSaveChanges = () => {
        axios.put(`http://localhost:3000/actualizarUsuario/${ultimoUsuario.id_usuario}`, editedUsuario)
            .then(response => {
                console.log('Usuario actualizado:', response.data);
                setUltimoUsuario(editedUsuario);
                setShowModal(false);
            })
            .catch(error => {
                console.error('Error al actualizar el usuario:', error);
            });
    };

    if (!ultimoUsuario) {
        return <div>Cargando...</div>;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundImage: "linear-gradient(to bottom, #022c5e, #0578d1)", paddingTop: "150px" }}>
            <Header />
            <div style={{ flex: 1, maxWidth: "800px", margin: "auto", padding: "50px", borderRadius: "20px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)", background: "rgba(255,255,255,0.9)", paddingBottom:"40px" }}>
                <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#0578d1", textShadow: "2px 2px 4px rgba(0,0,0,0.2)", fontSize: "2.5em" }}>¡Bienvenido a tu Perfil de Usuario!</h1>
                <div style={{ border: "3px solid #0578d1", borderRadius: "20px", padding: "30px", marginBottom: "40px", background: "rgba(255,255,255,0.8)", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}>
                    <div style={{ marginBottom: "20px" }}><strong style={{ color: "#333", marginRight: "10px", fontSize: "1.2em" }}>Nombre:</strong> <span style={{ color: "#0578d1", fontSize: "1.2em" }}>{ultimoUsuario.nombre}</span></div>
                    <div style={{ marginBottom: "20px" }}><strong style={{ color: "#333", marginRight: "10px", fontSize: "1.2em" }}>Apellido:</strong> <span style={{ color: "#0578d1", fontSize: "1.2em" }}>{ultimoUsuario.apellido}</span></div>
                    <div style={{ marginBottom: "20px" }}><strong style={{ color: "#333", marginRight: "10px", fontSize: "1.2em" }}>Correo:</strong> <span style={{ color: "#0578d1", fontSize: "1.2em" }}>{ultimoUsuario.correo}</span></div>
                    <div style={{ marginBottom: "20px" }}><strong style={{ color: "#333", marginRight: "10px", fontSize: "1.2em" }}>Rol:</strong> <span style={{ color: "#0578d1", fontSize: "1.2em" }}>{ultimoUsuario.rol}</span></div>
                    <div style={{ marginBottom: "20px" }}><strong style={{ color: "#333", marginRight: "10px", fontSize: "1.2em" }}>contraseña:</strong> <span style={{ color: "#0578d1", fontSize: "1.2em" }}>{ultimoUsuario.password}</span></div>
                </div>
                <div style={{ textAlign: "center", padding:"30px"}}>
                    <Botones type='button' style={{ padding: "15px 50px", backgroundColor: "#0578d1", color: "white", border: "none", borderRadius: "30px", cursor: "pointer", fontSize: "1.5em", boxShadow: "0 4px 8px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.2)" }} onClick={handleUpdate}>
                        ¡Actualizar!
                    </Botones>
                </div>
            </div>
            <Modal show={showModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" id="nombre" name="nombre" value={editedUsuario.nombre} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div>
                        <label htmlFor="apellido">Apellido:</label>
                        <input type="text" id="apellido" name="apellido" value={editedUsuario.apellido} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div>
                        <label htmlFor="correo">Correo:</label>
                        <input type="text" id="correo" name="correo" value={editedUsuario.correo} onChange={handleInputChange} className="form-control" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>Cerrar</Button>
                    <Button variant="primary" onClick={handleSaveChanges}>Guardar cambios</Button>
                </Modal.Footer>
            </Modal>
            <Footer />
        </div>
    );
}

export default EditarPerfilUsuarioPage;
