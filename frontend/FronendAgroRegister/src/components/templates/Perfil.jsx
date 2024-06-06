import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai';
import Header from "../organismos/Header/Header";
import { Modal, Button } from 'react-bootstrap';
import v from '../../styles/variables';

const EditarPerfilUsuarioPage = () => {
    const [ultimoUsuario, setUltimoUsuario] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editedUsuario, setEditedUsuario] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        rol: '',
        imagen: ''
    });
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No se encontró el token en el localStorage');
                    return;
                }
                const response = await axios.get('http://localhost:3000/listarUsuario', {
                    headers: {
                        'token': token
                    }
                });

                const ultimo = response.data[response.data.length - 1];
                setUltimoUsuario(ultimo);
                setEditedUsuario(ultimo || {});
                setIsLoading(false);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedUsuario(prevState => ({ ...prevState, [name]: value }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file);
        } else {
            alert('Por favor, selecciona una imagen válida.');
        }
    };

    const handleSaveChanges = async () => {
        if (!editedUsuario.nombre || !editedUsuario.apellido || !editedUsuario.correo) {
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }

        const formData = new FormData();
        formData.append('nombre', editedUsuario.nombre);
        formData.append('apellido', editedUsuario.apellido);
        formData.append('correo', editedUsuario.correo);
        formData.append('rol', editedUsuario.rol);
        if (selectedImage) {
            formData.append('imagen', selectedImage);
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No se encontró el token en el localStorage');
                return;
            }
            const id = ultimoUsuario.id_usuario; // Asegúrate de tener el ID correcto del usuario
            const response = await axios.put(`http://localhost:3000/actualizarUsuario/${id}`, formData, {
                headers: {
                    'token': token
                }
            });
            console.log('Usuario actualizado:', response.data);
            setUltimoUsuario(response.data);
            setShowModal(false);
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            alert('Error al actualizar el usuario.');
        }
    };

    if (isLoading) {
        return <div>Cargando perfil del usuario...</div>;
    }

    if (!ultimoUsuario) {
        return <div>No se pudo cargar la información del usuario.</div>;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundImage: `url(${v.ImgSlider1})`, backgroundSize: 'cover', paddingTop: "150px" }}>
            <Header />
            <div style={{ flex: 1, maxWidth: "800px", margin: "auto", padding: "50px", borderRadius: "20px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)", background: "rgba(255,255,255,0.9)", paddingBottom:"40px" }}>
                <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333", textShadow: "2px 2px 4px rgba(0,0,0,0.2)", fontSize: "2.5em" }}>¡Bienvenido a tu Perfil de Usuario!</h1>
                <div style={{ border: "3px solid #ddd", borderRadius: "20px", padding: "30px", marginBottom: "40px", background: "rgba(255,255,255,0.8)", boxShadow: "0 4px 8px rgba(0,0,0,0.2)", textAlign: "center" }}>
                   
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        {ultimoUsuario.imagen ? (
                            <img src={`http://localhost:3000/${ultimoUsuario.imagen}`} alt="Imagen de perfil" style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '50%' }} />
                        ) : (
                            <div>No hay imagen de perfil</div>
                        )}
                    </div>

                    <div style={{marginTop: '20px'}}>
                        <strong style={{ color: "#333", fontSize: "1.4em" }}><AiOutlineUser style={{ color: "#ff5722", marginRight: "10px" }} />Nombre/s:</strong>
                        <div style={{ color: "#555", fontSize: "1.2em", fontWeight: '600'}}>{ultimoUsuario.nombre}</div>
                    </div>

                    <div style={{marginTop: '20px'}}>
                        <strong style={{ color: "#333", fontSize: "1.4em" }}><AiOutlineUser style={{ color: "#ff5722", marginRight: "10px" }} />Apellido/s:</strong>
                        <div style={{ color: "#555", fontSize: "1.2em", fontWeight: '600'}}>{ultimoUsuario.apellido}</div>
                    </div>

                    <div style={{marginTop: '20px' }}>
                        <strong style={{ color: "#333", fontSize: "1.4em" }}><AiOutlineMail style={{ color: "#ff5722", marginRight: "10px" }} />Correo:</strong>
                        <div style={{ color: "#555", fontSize: "1.2em", fontWeight: '600' }}>{ultimoUsuario.correo}</div>
                    </div>
                    
                    <div style={{ marginTop: '40px', marginLeft: '480px', width: '50%'}}>
                        <Button variant="success" onClick={() => setShowModal(true)} style={{ fontWeight: '600',fontSize: "1.2em", width: '45%',height: '50px'}}>Editar Datos</Button>
                    </div>
                </div>
            </div>
           {/* <Footer /> */}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label>Nombre</label>
                            <input type="text" className="form-control" name="nombre" value={editedUsuario.nombre} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Apellido</label>
                            <input type="text" className="form-control" name="apellido" value={editedUsuario.apellido} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Correo</label>
                            <input type="email" className="form-control" name="correo" value={editedUsuario.correo} onChange={handleInputChange} />
                        </div>
                        {/* <div className="form-group">
                            <label>Rol</label>
                            <input type="text" className="form-control" name="rol" value={editedUsuario.rol} onChange={handleInputChange} />
                        </div> */}
                        <div className="form-group">
                            <label>Imagen</label>
                            <input type="file" className="form-control-file" accept="image/*" onChange={handleImageChange} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={handleSaveChanges}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditarPerfilUsuarioPage;
