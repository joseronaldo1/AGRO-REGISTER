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
        maxWidth: '400px' 
    };
    return (
        <div className='flex' style={{margin:'150px'}}>
            <HeaderInicio/>
            <div className='flex items-center justify-center'>
                <form style={formularioStyle}>
                    <label className="text-xl font-bold flex justify-center items-center p-10">Registro de Usuario</label>
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
