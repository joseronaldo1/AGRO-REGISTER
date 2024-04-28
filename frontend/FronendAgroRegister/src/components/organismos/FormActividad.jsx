import React, { useState } from 'react';
import axios from 'axios';

const FormActividad = ({ onSubmit, className, initialData, mode, cerrarModal }) => {
  const initialFormData = {
    nombre_actividad: initialData ? initialData.nombre_actividad : '',
    tiempo: initialData ? initialData.tiempo : '',
    observaciones: initialData ? initialData.observaciones : '',
    valor_actividad: initialData ? initialData.valor_actividad : '',
    fk_id_variedad: initialData ? initialData.fk_id_variedad : '',
    estado: initialData && mode === 'update' ? initialData.estado : 'activo'
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showWarning, setShowWarning] = useState(false);

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
      if (!formData.nombre_actividad || !formData.tiempo || !formData.observaciones || !formData.valor_actividad || !formData.fk_id_variedad) {
        setShowWarning(true);
        return;
      }
  
      if (mode === 'registro') {
        const response = await axios.post(
          'http://localhost:3000/Registrara',
          formData
        );
        console.log(response.data);
      } else if (mode === 'update' && initialData && initialData.id) {
        const { id } = initialData;
        await axios.put(
          `http://localhost:3000/Actualizara/actividad/${id}`,
          formData
        );
      } else {
        console.error('ID de actividad no válido.');
      }
  
      onSubmit(formData);
      cerrarModal();
    } catch (error) {
      console.error('Error al procesar el formulario:', error);
    }
  };
  

  return (
    <form className={className} onSubmit={handleFormSubmit} style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      {showWarning && (
        <p style={{ color: 'red', marginBottom: '10px' }}>
          Por favor complete todos los campos
        </p>
      )}
      {mode === 'update' && (
        <div className="flex flex-col">
          <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>Estado: </label>
          <br />
          <select
            style={{ borderColor: '#1bc12e', borderRadius: '6px', width: '50%', height: '40px' }}
            name="estado"
            value={formData.estado}
            onChange={handleChange}
          >
            <option value="activo">Activo</option>
            <option value="proceso">Proceso</option>
            <option value="terminado">Terminado</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
      )}
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>Nombre Actividad: </label>
        <br />
        <input style={{ borderColor: '#1bc12e', borderRadius: '6px', width: '50%', height: '40px' }}
          type="text"
          name="nombre_actividad"
          placeholder="Nombre de Actividad"
          value={formData.nombre_actividad}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>Tiempo: </label>
        <br />
        <input style={{ borderColor: '#1bc12e', borderRadius: '6px', width: '50%', height: '40px' }}
          type="text"
          name="tiempo"
          placeholder="Tiempo"
          value={formData.tiempo}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>Observaciones: </label>
        <br />
        <input style={{ borderColor: '#1bc12e', borderRadius: '6px', width: '50%', height: '40px' }}
          type="text"
          name="observaciones"
          placeholder="Observaciones"
          value={formData.observaciones}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>Valor actividad: </label>
        <br />
        <input style={{ borderColor: '#1bc12e', borderRadius: '6px', width: '50%', height: '40px' }}
          type="text"
          name="valor_actividad"
          placeholder="Valor actividad"
          value={formData.valor_actividad}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>fk_id_variedad: </label>
        <br />
        <input style={{ borderColor: '#1bc12e', borderRadius: '6px', width: '50%', height: '40px' }}
          type="text"
          name="fk_id_variedad"
          placeholder="fk_id_variedad"
          value={formData.fk_id_variedad}
          onChange={handleChange}
        />
      </div>

      <button className="boton" type="submit" style={{ backgroundColor: '#1bc12e', borderRadius: '10px', color: 'white', border: 'none', marginLeft: '3%', width: '20%', fontSize: '17px', marginTop: '20px', height: '40px' }}>
        {mode === 'registro' ? 'Registrar' : 'Actualizar'}
      </button>
    </form>
  );
};

export default FormActividad;
