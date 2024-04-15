import React, { useState } from 'react';
import HeaderInicio from '../components/organismos/Header/HeaderInicio.jsx';
import axios from 'axios';
import InputAtom from '../components/atomos/Inputs.jsx';
import Botones from '../components/atomos/Botones.jsx';
import { Link } from 'react-router-dom';

export const IniciarSesion = () => {
  
  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  });

  const [loading, setLoading] = useState(false); // Estado para indicar si se está procesando la solicitud

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Indicar que se está cargando
      
      const response = await axios.post('http://localhost:3000/validacion', formData);
      const responseData = response.data;

      // Guardar el token en el localStorage
      localStorage.setItem('token', responseData.token);
      console.log(localStorage);
      alert('Inicio de sesión exitoso');
      
      // Redireccionar a la página de dashboard
      window.location.href = "/dashboard";
      
      // Redireccionar a otra página, o realizar otras acciones necesarias después del inicio de sesión
    } catch (error) {
      alert('Error al iniciar sesión:', error.response.data.message);
    } finally {
      setLoading(false); // Indicar que se ha terminado la carga, ya sea con éxito o con error
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className='flex' style={{ margin: '150px', justifyContent: 'center' }}>
      <HeaderInicio/>
      <div className='flex items-center justify-center'>
        <h2 style={{ fontSize: '1.3em', fontWeight: 'bold', textAlign: 'center', padding: '1.25rem 0' }}>Inicio de Sesión</h2>
        <form style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px', margin: '20px auto', maxWidth: '400px', textAlign: 'center' }} onSubmit={handleSubmit} method="post">
          <InputAtom label="Correo:" id="correo" name="correo" type="email" value={formData.correo} onChange={handleChange} />
          <InputAtom label="Contraseña:" id="password" name="password" type="password" value={formData.password} onChange={handleChange} />
          <Botones type="submit" disabled={loading}>Iniciar Sesión</Botones>
          {loading && <span>Cargando...</span>}
        </form>
        
        <Link to='/olvidocontra1'>Olvide Contraseña</Link>
      </div>
    </div>
  );
}
