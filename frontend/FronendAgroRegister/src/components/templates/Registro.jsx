import React, { useState } from 'react';
import Botones from '../atomos/Botones.jsx';
import HeaderInicio from '../organismos/Header/HeaderInicio.jsx';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logoOrigi.png';
import fondo from '../../assets/SENA_Tecnoparque_ Agroecológico_Yamboro.png';
import InputAtom from '../atomos/Inputs.jsx'; // Assuming this is your custom input component
import axios from 'axios';



const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    rol: '',
    estado: ''
  });

  const [loading, setLoading] = useState(false); // Estado para controlar la carga
  const [allowSubmit, setAllowSubmit] = useState(true); // Estado para controlar si se permite enviar el formulario

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Comenzar la carga

    try {
      const response = await axios.post('http://localhost:3000/registrarUsuario', formData);
      alert('Registro exitoso:', response.data);
      
      // Limpiar el formulario después de enviar los datos
      setFormData({
        nombre: '',
        apellido: '',
        correo: '',
        password: '',
        rol: '',
        estado: ''
      });
      window.location.href = "/";
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.length > 0) {
        const errorMessage = error.response.data.errors[0].msg;
        alert(errorMessage);
      } else {
        console.log(error);
        alert('Error al registrar:', error);
      }
    }

    setLoading(false); // Detener la carga
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
    margin: '130px auto 0',  
    maxWidth: '400px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  };

  const fondoStyle = {
    backgroundImage: `url(${fondo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    position: 'relative',
  };

  const tituloStyle = {
    fontSize: '2.3em',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '1.30rem 0',
    color: '#333',
  };

  const imgStyle = {
    display: 'block',
    margin: '0 auto',
    maxWidth: '160px',
  };

  const btnWrapperStyle = {
    textAlign: 'center',
    marginTop: '20px',
  };

  return (
    <div style={fondoStyle}>
      <div className='flex justify-center'>
        <HeaderInicio />
      </div>
      <div className='flex items-center justify-center' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} >
        <form style={formularioStyle} onSubmit={handleSubmit}>      
          <h2 style={tituloStyle}>Registro de Usuario</h2>
          <img src={Logo} alt="Logo" style={imgStyle} />
          <div className='flex flex-col space-y-4'>
            <InputAtom label="Nombre:" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
            <InputAtom label="Apellido:" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} />
            <InputAtom label="Correo:" id="correo" name="correo" type="email" value={formData.correo} onChange={handleChange} />
            <InputAtom label="Contraseña:" id="password" name="password" type="password" value={formData.password} onChange={handleChange} />
            <InputAtom label="Rol:" id="rol" name="rol" value={formData.rol} onChange={handleChange} />
            <InputAtom label="Estado:" id="estado" name="estado" value={formData.estado} onChange={handleChange} />
            {loading && <span>Cargando...</span>}
          </div>
          <div style={btnWrapperStyle}>
            <Botones type={'submit'} children={'Registrarse'} disabled={!allowSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
};


export default Registro;
