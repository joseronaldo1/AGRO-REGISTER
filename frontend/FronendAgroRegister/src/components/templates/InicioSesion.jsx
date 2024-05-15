import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../organismos/Footer/Footer.jsx';
import axios from 'axios';
import HeaderInicio from '../organismos/Header/HeaderInicio.jsx';
import InputAtom from '../atomos/Inputs.jsx';
import Botones from '../atomos/Botones.jsx';
import fondo from '../../assets/SENA_Tecnoparque_ Agroecológico_Yamboro.png';
import Logo from '../../assets/logoOrigi.png';

const IniciarSesion = () => {
    const [formData, setFormData] = useState({
        correo: '',
        password: ''
    });

    const [loading, setLoading] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.correo.trim() === '' || formData.password.trim() === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        try {
            setLoading(true); 

            const response = await axios.post('http://localhost:3000/validacion', formData);
            const responseData = response.data;

            localStorage.setItem('token', responseData.token);
            alert('Inicio de sesión exitoso');
            window.location.href = "/dashboard";
        } catch (error) {
            alert('Error al iniciar sesión:', error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const formularioStyle = {
        border: '1px solid #ccc',
        borderRadius: '25px',
        padding: '80px',
        marginTop: '150px',
        maxWidth: '800px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };


    const tituloStyle = {
        fontSize: '2.3em',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '1.30rem',
    };

    const buttonStyle = {
        outline: 'none',
        background: '#1bc12e',
        border: 'none',
        width: '100%',
        marginTop: '20px',
    };

    const buttonsContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    };

    return (
        <div style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', position: 'relative' }}>
            <HeaderInicio />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 100px)', marginBottom:"40px" }}>
                <form style={formularioStyle} onSubmit={handleSubmit}>
                    <label style={tituloStyle}>Inicio de Sesión</label>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                        <div>
                            <InputAtom
                                className={'mb-3 height-10'}
                                type="email"
                                placeholder="Correo Electrónico"
                                name="correo"
                                value={formData.correo}
                                onChange={handleChange}
                            />
                            <InputAtom
                                type="password"
                                placeholder="Contraseña"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <img src={Logo} alt="Logo" style={{ maxWidth: '250px', marginLeft: '50px',}} />
                    </div>
                    {loading && <span>Cargando...</span>}
                    <Link to='/olvidocontra1' style={{marginBottom:"30px"}}>¿Olvidó su contraseña?</Link>
                    <div style={buttonsContainerStyle}>
                        <Botones style={buttonStyle} children='Iniciar' type="submit" disabled={loading} />
                        <Link to='/registrarse' style={{ textDecoration: 'none' }}>
                            <Botones children='Registrarse' style={buttonStyle} />
                        </Link>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default IniciarSesion;
