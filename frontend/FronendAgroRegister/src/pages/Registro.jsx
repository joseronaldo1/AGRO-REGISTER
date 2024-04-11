import React from 'react';
import Formulario from '../components/organismos/Formulario.jsx';
import Botones from '../components/atomos/Botones.jsx';
import { Modal } from 'react-bootstrap';
import HeaderInicio from '../components/organismos/Header/HeaderInicio.jsx';
import { Link } from 'react-router-dom';

export const Registro = () => {
    const campos = [
        { name: 'nombre', type: 'text', placeholder: 'Nombres' },
        { name: 'apellidos', type: 'text', placeholder: 'Apellidos' },
        { name: 'correo', type: 'text', placeholder: 'Correo Electronico' },
        { name: 'password', type: 'password', placeholder: 'Contraseña' },
    ];
    const formularioStyle = {
        border: '1px solid #ccc', 
        borderRadius: '5px', 
        padding: '20px', 
        margin: '20px auto', 
        maxWidth: '400px',
        textAlign: 'center' // Alineación centrada del contenido del formulario
    };
    const tituloStyle = {
        fontSize: '1.3em', // Tamaño de fuente más grande
        fontWeight: 'bold', // Negrita
        textAlign: 'center', // Alineación centrada del texto
        padding: '1.25rem 0', // Espaciado interior superior e inferior
    };
    return (
        <div className='flex' style={{ margin: '150px', justifyContent: 'center' }}>
            <HeaderInicio/>
            <div className='flex items-center justify-center'>
                <form style={formularioStyle}>      
                    <label style={tituloStyle}>Registro de Usuario</label>
                    <div style={{marginTop :'100px'}}>
                        <Formulario campos={campos} />
                    </div>
                    <div className='flex flex-col m-5 justify-center items-center'>
                        <Link to='/iniciosesion'>
                            <Botones children='Enviar' />
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
