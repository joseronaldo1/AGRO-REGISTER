import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeaderInicio from '../organismos/Header/HeaderInicio.jsx';
import Footer from '../organismos/Footer/Footer.jsx';
import InputAtom from '../atomos/Inputs.jsx';
import Botones from '../atomos/Botones.jsx';
import fondo from '../../assets/SENA_Tecnoparque_ Agroecológico_Yamboro.png'; // Import the background image if not already imported
import Logo from '../../assets/logoOrigi.png';// Import the logo image if not already imported

const IniciarSesion = () => {
  const [formData, setFormData] = useState({
      correo: '',
      password: ''
  });

  const [loading, setLoading] = useState(false); // Estado para indicar si se está procesando la solicitud

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (formData.correo.trim() === '' || formData.password.trim() === '') {
          alert('Por favor, complete todos los campos.');
          return;
      }

      try {
          setLoading(true); // Indicar que se está cargando

          const response = await axios.post('http://localhost:3000/validacion', formData);
          const responseData = response.data;

          localStorage.setItem('token', responseData.token);
          console.log(localStorage);
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
      borderRadius: '15px',
      padding: '40px',
      margin: '20px auto',
      maxWidth: '400px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
  };

  const fondoStyle = {
      backgroundImage: `url(${fondo})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: 'calc(100vh - 100px)', // Restar la altura del encabezado al 100vh
      maxHeight: '100%',
      width: '100%',
      overflowY: 'auto',
      position: 'fixed',
      top: '100px', // Ajustar la posición superior para que comience debajo del encabezado
      left: 0,
      zIndex: -1,
  };


  const tituloStyle = {
      fontSize: '2.3em',
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
      padding: '1.30rem',
  };

  const linkOlvidoContrasenaStyle = {
   
  };

  const linkOlvidoContrasenaHoverStyle = {
      textShadow: '0 0 12px #009100', 
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
      <div style={fondoStyle}>
          <div className='flex' style={{ margin: '130px' }}>
              <HeaderInicio />
              <div className='flex items-center justify-center'>
                  <form style={{ textAlign: 'center', ...formularioStyle }} onSubmit={handleSubmit}>
                      <label style={tituloStyle}>Inicio de Sesión</label>
                      <img src={Logo} alt="Logo" style={{ maxWidth: '160px' }} />
                      <div style={{ marginTop: '20px', }}>
                          <InputAtom
                              className={'mb-2 height-10'}
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
                      <div className='flex items-center justify-center'>

                      </div>
                      <br />
                      <div
                          style={{ textAlign: 'center' }}
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                      >
                          {loading && <span>Cargando...</span>}
                          <Link
                              to='/olvidocontra1'
                              style={{
                                  ...linkOlvidoContrasenaStyle,
                                  ...(isHovered && linkOlvidoContrasenaHoverStyle)
                              }}
                          >
                              ¿Olvidó su contraseña?
                          </Link> 
                         
                      </div>
            
                      <div style={{ display: 'flex', justifyContent: 'center', margin: '27px', marginTop: '60px' }}>
                          
                      <p>ㅤ</p><Botones children='Iniciar' type="submit" disabled={loading} />
                          <div>
                              <Link style={{ textDecoration: 'none'}} to='/registrarse'>
                                <Botones children='Registrarse' /> 
                              </Link>
                          </div>
                      </div>
                  </form>
              </div>
             
          </div>
          <Footer />
      </div>
     
  );
};

export default IniciarSesion;
