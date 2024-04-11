import React from 'react';
import Formulario from '../components/organismos/Formulario.jsx';
import Botones from '../components/atomos/Botones.jsx';
import { Link } from 'react-router-dom';
import HeaderInicio from '../components/organismos/Header/HeaderInicio.jsx';

export const IniciarSesion = () => {
    const campos = [
        { name: 'correo', type: 'text', placeholder: 'Correo Electrónico' },
        { name: 'password', type: 'password', placeholder: 'Contraseña' },
    ];
    
    const formularioStyle = {
        border: '1px solid #ccc',
        borderRadius: '5px', 
        padding: '20px', 
        margin: '20px auto', 
        maxWidth: '400px' 
    };

    const tituloStyle = {
        fontSize: '1.3em', // Tamaño de fuente más grande
        fontWeight: 'bold', // Negrita
        textAlign: 'center', // Alineación centrada del texto
        padding: '1.25rem 0', // Espaciado interior superior e inferior
    };

    return (
        <div className='flex' style={{ margin: '150px' }}>
            <HeaderInicio />
            <div className='flex items-center justify-center'>
                <form style={{ textAlign: 'center', ...formularioStyle }}>
                    <label style={tituloStyle}>Inicio de Sesión</label>
                    <div style={{ marginTop: '100px' }}>
                        <Formulario campos={campos} />
                    </div>
                    <div className="text-xl font-bold justify-center items-center p-10" style={{ textAlign: 'center' }}>
                        <Link to='/olvidocontra1'>¿Olvidó su contraseña?</Link>
                    </div>
                    <div className='flex flex-col m-5 justify-center items-center'>
                        <Link to='/dashboard'>
                            <Botones children='Iniciar' />
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
