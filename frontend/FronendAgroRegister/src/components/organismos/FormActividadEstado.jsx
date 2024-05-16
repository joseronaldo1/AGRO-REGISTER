import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa SweetAlert

const FormularioVariedad = ({ onSubmit, className, initialData, mode, cerrarModal }) => {
  const initialFormData = {
    estado: initialData ? initialData.estado : ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showWarning, setShowWarning] = useState(false); // Estado para mostrar la advertencia

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
      if (!formData.estado) {
        setShowWarning(true);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor seleccione un estado para la actividad'
        });
        return;
      }


      if (mode === 'update') {
        const { id } = initialData;
        await axios.put(
          `http://localhost:3000/Desactivara/actividad/${id}`,
          formData
        );
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'El estado se ha actualizado exitosamente'
        });
      }


      onSubmit(formData);
      cerrarModal();
    } catch (error) {
      console.error('Error al procesar el formulario:', error);
    }
  };

  return (
    <form
      className={className}
      onSubmit={handleFormSubmit}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >


      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          Estado de la actividad:{' '}
        </label>
        <br />
        <select
          style={{
            borderColor: '#1bc12e',
            borderRadius: '6px',
            width: '50%',
            height: '40px'
          }}
          name="estado"
          value={formData.estado}
          onChange={handleChange}
        >
          <option value="">Seleccione...</option>
          <option value="activo">activo</option>
          <option value="ejecutandose">ejecutandose</option>
          <option value="inactivo">inactivo</option>
          <option value="terminado">terminado</option>
        </select>
      </div>
      <button
        className="boton"
        type="submit"
        style={{
          backgroundColor: 'green',
          borderRadius: '10px',
          color: 'white',
          border: 'none',
          marginLeft: '3%',
          width: '20%',
          fontSize: '17px',
          marginTop: '20px',
          height: '40px'
        }}
      >
        Cambiar
      </button>
    </form>
  );
};

export default FormularioVariedad;
