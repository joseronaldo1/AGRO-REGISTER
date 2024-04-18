import React from 'react';
import Formulario from '../organismos/Formulario.jsx';
import Botones from '../atomos/Botones.jsx';
import { Link } from 'react-router-dom';
import HeaderInicio from '../organismos/Header/HeaderInicio.jsx';
import Logo from '../../assets/logoOrigi.png';
import fondo from '../../assets/SENA_Tecnoparque_ Agroecológico_Yamboro.png'; // Importa la imagen de fondo

const IniciarSesion = () => {
    const campos = [
        { name: 'correo', type: 'text', placeholder: 'Correo Electrónico' },
        { name: 'password', type: 'password', placeholder: 'Contraseña' },
    ];
    
    const formularioStyle = {
        border: '1px solid #ccc',
        borderRadius: '15px', 
        padding: '40px', 
        margin: '20px auto',  
        maxWidth: '400px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Cambia el color de fondo para hacerlo semitransparente
    };

    const fondoStyle = {
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh', // Establece la altura del fondo como el 100% de la altura de la ventana
        width: '100%', // Establece el ancho del fondo como el 100% del ancho de la ventana
        position: 'fixed', // Fija la posición del fondo para que no se desplace con el contenido
        top: 0,
        left: 0,
        zIndex: -1, // Coloca el fondo detrás del contenido
    };

    const tituloStyle = {
        fontSize: '2.3em',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '1.30rem',
    };

    return (
        <div style={fondoStyle}>
            <div className='flex' style={{ margin: '130px'}}>
                <HeaderInicio />
                <div className='flex items-center justify-center'>
                    <form style={{ textAlign: 'center', ...formularioStyle }}>
                        <label style={tituloStyle}>Inicio de Sesión</label>
                        <img src={Logo} alt="" style={{ maxWidth: '160px'}} />
                        <div style={{ marginTop: '20px' }}>
                            <Formulario campos={campos} />
                        </div>
                        <div style={{ textAlign: 'center'}}>
                            <Link to='/olvidocontra1'>¿Olvidó su contraseña?</Link>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', margin:'15px',  marginTop:'60px' }}>
                            <div >
                                <Link to='/dashboard'>
                                    <Botones children='Iniciar' />
                                </Link>
                            </div>
                            <div >
                                <Link to='/registrarse'>
                                    <Botones children='Registrarse' />
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default IniciarSesion;
