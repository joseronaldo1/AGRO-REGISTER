import React, { useState } from 'react'; // Added useState import
import axios from 'axios';
import InputAtom from '../../atomos/Inputs';
import Botones from '../../atomos/Botones';
import HeaderInicio from '../../organismos/Header/HeaderInicio';
import { Link } from 'react-router-dom';

const FormularioActividad = () => {
  const [formData, setFormData] = useState({
    nombre_actividad: '',
    tiempo: '',
    observaciones: '',
    fk_id_variedad: '',
    valor_actividad: '',
    estado: ''
  });
  const [loading, setLoading] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/RegistraraAC', formData);
      alert('Registro exitoso: ' + response.data); // Concatenated message properly
      setFormData({
        nombre_actividad: '',
        tiempo: '',
        observaciones: '',
        fk_id_variedad: '',
        valor_actividad: '',
        estado: ''
      });
      window.location.href = "/iniciosesion";
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.length > 0) {
        const errorMessage = error.response.data.errors[0].msg;
        alert(errorMessage);
      } else {
        alert('Error al registrar: ' + error.message); // Concatenated message properly
      }
      console.log(error);
    } finally {
      setLoading(false);
      setAllowSubmit(true);
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
    borderRadius: '5px',
    padding: '20px',
    margin: '20px auto',
    maxWidth: '400px',
    textAlign: 'center'
  };

  const tituloStyle = {
    fontSize: '1.3em',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '1.25rem 0',
  };

  return (
    <div className='flex' style={{ margin: '150px', justifyContent: 'center' }}>
      <HeaderInicio />
      <div className='flex items-center justify-center'>
        <h2 style={tituloStyle}>Formulario de Registro</h2>
        <form style={formularioStyle} onSubmit={allowSubmit ? handleSubmit : null} method="post">
          <InputAtom label="Nombre de la Actividad:" id="nombre_actividad" name="nombre_actividad" value={formData.nombre_actividad} onChange={handleChange} />
          <InputAtom label="Tiempo:" id="tiempo" name="tiempo" value={formData.tiempo} onChange={handleChange} />
          <InputAtom label="Observaciones:" id="observaciones" name="observaciones" value={formData.observaciones} onChange={handleChange} />
          <InputAtom label="ID de Variedad:" id="fk_id_variedad" name="fk_id_variedad" value={formData.fk_id_variedad} onChange={handleChange} />
          <InputAtom label="Valor de la Actividad:" id="valor_actividad" name="valor_actividad" value={formData.valor_actividad} onChange={handleChange} />
          <InputAtom label="Estado:" id="estado" name="estado" value={formData.estado} onChange={handleChange} />
          <Botones type="submit" disabled={!allowSubmit || loading}>Registrarse</Botones>
          {loading && <div className='flex items-center justify-center'><span>Cargando...</span></div>}
          <div className='flex items-center justify-center'><Link to='/iniciosesion'>Ya tienes cuenta</Link></div>
        </form>
      </div>
    </div>
  );
}

export default FormularioActividad;
