 import React from 'react';
 import Formulario from '../organismos/Formulario.jsx';
 import Botones from '../atomos/Botones.jsx';
 import HeaderInicio from '../organismos/Header/HeaderInicio.jsx';
 import { Link } from 'react-router-dom';
 import Logo from '../../assets/logoOrigi.png';
 import fondo from '../../assets/SENA_Tecnoparque_ Agroecológico_Yamboro.png';

 const Registro = () => {
    const campos = [
        { name: 'nombre', type: 'text', placeholder: 'Nombres' },
        { name: 'apellidos', type: 'text', placeholder: 'Apellidos' },
        { name: 'correo', type: 'text', placeholder: 'Correo Electronico' },
        { name: 'password', type: 'password', placeholder: 'Contraseña' },
    ];
    const formularioStyle = {
        border: '1px solid #ccc', 
        borderRadius: '15px', 
        padding: '40px', 
        margin: '20px auto', 
        maxWidth: '400px',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)' // Alineación centrada del contenido del formulario
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
        fontSize: '1.6em', // Tamaño de fuente más grande
        fontWeight: 'bold', // Negrita
        textAlign: 'center', // Alineación centrada del texto
        padding: '1.30rem', // Espaciado interior superior e inferior
    };
    return (
    <div style={fondoStyle}>
        <div className='flex' style={{ margin: '130px', justifyContent: 'center' }}>
            <HeaderInicio/>
            <div className='flex items-center justify-center'>
                <form style={formularioStyle}>      
                    <label style={tituloStyle}>Registro de Usuario</label>
                    <img src={Logo} alt="" style={{ maxWidth: '160px'}} />
                    <div style={{marginTop :'20px'}}>
                        <Formulario campos={campos} />
                    </div>
                    <div className='m-3'>
                        <Link to='/'>
                            <Botones children='Enviar' />
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
};

export default Registro;
