import React, { useState } from 'react';
import axios from 'axios'; // Importa Axios
import Boton from '../atomos/BotonRegistrar';

const Formulario = ({ onSubmit, className, initialData, mode, cerrarModal }) => {
  const initialFormData = {
    nombre_recursos: initialData ? initialData.nombre_recursos : '',
    cantidad_medida: initialData ? initialData.cantidad_medida : '',
    unidades_medida: initialData ? initialData.unidades_medida : '',
    extras: initialData ? initialData.extras : ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/RegistroRecurso', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data); // Manejar la respuesta según necesites
      onSubmit(formData);
      cerrarModal(); // Cerrar el modal después de enviar el formulario
    } catch (error) {
      console.error('Error al registrar el recurso:', error);
    }
  };

  return (
    <form className={className} onSubmit={handleFormSubmit} style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
      <div className="flex flex-col" >
        <label className="text-x1 font-bold w-80" style={{fontWeight: 'bold'}}>Nombre Recursos: </label>
        <br />
        <input  style={{ borderColor: '#1bc12e', borderRadius: '6px', width: '50%', height:'40px' }}
          type="text"
          name="nombre_recursos"
          placeholder="Nombre de Recursos"
          value={formData.nombre_recursos}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{fontWeight: 'bold'}}>Cantidad Medida: </label>
        <br />
        <input  style={{borderColor: '#1bc12e', borderRadius: '6px', width: '50%', height:'40px' }}
          type="text"
          name="cantidad_medida"
          placeholder="Cantidad de Medida"
          value={formData.cantidad_medida}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{fontWeight: 'bold'}}>Unidades Medida: </label>
        <br />
        <input  style={{ borderColor: '#1bc12e', borderRadius: '6px', width: '50%', height:'40px' }}
          type="text"
          name="unidades_medida"
          placeholder="Unidades de Medida"
          value={formData.unidades_medida}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{fontWeight: 'bold'}}>Extras: </label>
        <br />
        <input style={{borderColor: '#1bc12e', borderRadius: '6px', width: '50%', height:'40px' }}
          type="text"
          name="extras"
          placeholder="Extras"
          value={formData.extras}
          onChange={handleChange}
        />
      </div>
      <button className="boton" type="submit" style={{backgroundColor: '#1bc12e', 
      borderRadius: '10px', color: 'white', 
      border: 'none', marginLeft: '3%', width: '20%', fontSize: '17px', marginTop: '20px', height: '40px'}} >
        Registrar</button>
    </form>
  );
};

export default Formulario;