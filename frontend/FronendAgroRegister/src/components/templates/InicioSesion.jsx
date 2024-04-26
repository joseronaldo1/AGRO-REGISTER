// import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeaderInicio from '../organismos/Header/HeaderInicio.jsx';
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
        height: '100vh',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
      };
    
      const tituloStyle = {
        fontSize: '2.3em',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '1.30rem',
      };
      
    
      return (
        <div style={fondoStyle}>
          <div className='flex' style={{ margin: '130px' }}>
            <HeaderInicio />
            <div className='flex items-center justify-center'>
              <form style={{ textAlign: 'center', ...formularioStyle }} onSubmit={handleSubmit}>
                <label style={tituloStyle}>Inicio de Sesión</label>
                <img src={Logo} alt="Logo" style={{ maxWidth: '160px' }} />
                <div style={{ marginTop: '20px',  }}>
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
                <div className='flex items-center justify-center'>
                  {loading && <span>Cargando...</span>}
                </div>
                <div style={{ textAlign: 'center'}}>
                  <Link to='/olvidocontra1'>¿Olvidó su contraseña?</Link>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '15px', marginTop: '60px' }}>
                  <Botones children='Iniciar' type="submit" disabled={loading}/>
                  <div>
                    <Link to='/registrarse' disabled={loading}>
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
