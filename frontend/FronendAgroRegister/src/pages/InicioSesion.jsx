import React, { useState } from 'react';
import Formulario from '../components/organismos/Formulario.jsx';
import Botones from '../components/atomos/Botones.jsx';
import { Link } from 'react-router-dom';
import HeaderInicio from '../components/organismos/Header/HeaderInicio.jsx';
import axios from 'axios';

export const IniciarSesion = () => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/validacion', { correo, password });
            if (response.data.nombre.length > 0) {
                // Suponiendo que deseas acceder al primer usuario autenticado en caso de múltiples resultados
                const usuarioAutenticado = response.data.nombre[0];
                // Usuario autenticado correctamente
                console.log('Inicio de sesión exitoso');
                // Aquí podrías guardar el token en localStorage o en el estado de tu aplicación
                const token = response.data.token;
                // Redirigir al usuario al dashboard
                window.location.href = '/dashboard';
            } else {
                setError('Correo o contraseña incorrectos');
            }
        } catch (error) {
            setError(error.response.data.message || 'Error desconocido');
            console.log(error);
        }
    };

    const formularioStyle = {
        border: '1px solid #ccc',
        borderRadius: '5px', 
        padding: '20px', 
        margin: '20px auto', 
        maxWidth: '400px' 
    };

    const tituloStyle = {
        fontSize: '1.3em',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '1.25rem 0',
    };

    return (
        <div className='flex' style={{ margin: '150px' }}>
            <HeaderInicio />
            <div className='flex items-center justify-center'>
                <form style={{ textAlign: 'center', ...formularioStyle }} onSubmit={handleSubmit}>
                    <label style={tituloStyle}>Inicio de Sesión</label>
                    <div style={{ marginTop: '100px' }}>
                        <Formulario campos={[
                            { name: 'correo', type: 'text', placeholder: 'Correo Electrónico', value: correo, onChange: (e) => setCorreo(e.target.value) },
                            { name: 'password', type: 'password', placeholder: 'Contraseña', value: password, onChange: (e) => setPassword(e.target.value) }
                        ]} />
                    </div>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <div className="text-xl font-bold justify-center items-center p-10" style={{ textAlign: 'center' }}>
                        <Link to='/olvidocontra1'>¿Olvidó su contraseña?</Link>
                    </div>
                    <div className='flex flex-col m-5 justify-center items-center'>
                        <button type="submit"><Botones children='Iniciar' /></button>
                    </div>
                </form>
            </div>
        </div>
    );
};
