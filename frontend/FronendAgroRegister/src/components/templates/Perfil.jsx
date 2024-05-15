import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Botones from '../atomos/Botones.jsx';
import Logo from '../../assets/logoOrigi.png';
import { Link } from 'react-router-dom';
import Header from '../organismos/Header/Header.jsx';
import Footer from '../organismos/Footer/Footer';

const EditarPerfilUsuario = () => {
    const [datosUsuario, setDatosUsuario] = useState({
      nombre: '',
      apellido: '',
      correo: '',
      password: '',
      rol: '',
      estado: ''
    });
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3000/usuario'); // Ajusta según tu API
                setDatosUsuario(response.data);
            } catch (error) {
                console.error('Error al obtener datos del usuario:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleEdit = (campo) => {
        setEditing({
            ...editing,
            [campo]: !editing[campo]
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDatosUsuario({
            ...datosUsuario,
            [name]: value
        });
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            await axios.put('http://localhost:3000/usuario', datosUsuario);  // Ajusta según tu API
            alert('Datos actualizados correctamente.');
            setEditing({});  // Reset editing state
        } catch (error) {
            console.error('Error al actualizar datos del usuario:', error);
        } finally {
            setLoading(false);
        }
    };

    const formularioStyle = {
        padding: '20px',
        margin: '80px auto',
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: '10px'
    };

    const labelStyle = {
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: 'black',
        paddingEnd: '50px'
    };

    const inputStyle = {
        margin: '0 10px',
        flex: '1'
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '60px' }}>
            <Header />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <form style={formularioStyle} onSubmit={(e) => e.preventDefault()}>
                    <div style={{ marginRight: '30px' }}>
                        <label style={labelStyle}>Edición de Usuario</label>
                        {Object.entries(datosUsuario).map(([campo, valor]) => (
                            <div key={campo} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <span style={{ width: '100px' }}>{campo}:</span>
                                {editing[campo] ? (
                                    <input
                                        style={inputStyle}
                                        type={campo === 'password' ? 'password' : 'text'}
                                        name={campo}
                                        value={valor}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <span style={{ flex: 1 }}>{valor}</span>
                                )}
                                <button type="button" onClick={() => handleEdit(campo)}>Editar</button>
                            </div>
                        ))}
                        <button onClick={handleSave} style={{ backgroundColor: 'green', border: 'none', padding: '10px 20px', borderRadius: '5px', color: 'white', fontWeight: 'bold' }}>Guardar</button>
                    </div>
                    <img src={Logo} alt="" style={{ maxWidth: '350px', maxHeight: '350px', marginLeft: '20px', marginTop: '80px' }} />
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default EditarPerfilUsuario;
