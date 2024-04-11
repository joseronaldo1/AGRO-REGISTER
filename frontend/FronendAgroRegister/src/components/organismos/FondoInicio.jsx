import React from 'react';
import { Button } from 'react-bootstrap';
import v from '../../styles/variables'; // Importa el objeto v que contiene las imágenes v.image9
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import { Link } from 'react-router-dom';

const FondoInicio = () => {
    return (
        <div className="fondo-inicio d-flex flex-column justify-content-center align-items-center"> {/* Clase para el contenedor */}
            <div className='container'>
                <div className='row justify-content-center'> {/* Estilos para el contenido */}
                    <div className='col-md-6 text-center'> {/* Estilos para los botones */}
                        <Button variant="primary" size="lg" className="mb-2" style={{ backgroundColor: '#008000', border: 'none', marginTop: '-200px', marginRight: '20px' }}> {/* Estilos para el primer botón */}
                        <Link to='/iniciosesion' className='text-white text-decoration-none'>Iniciar Sesion</Link>
                        </Button>
                        <Button variant="primary" size="lg" className="mb-2" style={{ backgroundColor: '#008000', border: 'none', marginTop: '-200px', marginLeft: '20px'}}> {/* Estilos para el segundo botón */}
                        <Link to='/registrarse' className='text-white text-decoration-none'>Registrarse</Link>
                        </Button>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .fondo-inicio {
                    background-image: url(${v.image9}); 
                    background-size: cover; 
                    background-position: center;
                    min-height: 100vh;
                    padding: 20px; 
                    overflow-y: hidden; 
                    background-attachment: fixed; 

                .btn:focus {
                    outline: none;
                    box-shadow: none;
                }
            `}</style>
        </div>
    );
};

export default FondoInicio;
