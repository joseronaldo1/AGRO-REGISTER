import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa SweetAlert

const Formulariolote = ({ onSubmit, className, initialData, mode, cerrarModal }) => {
  const initialFormData = {
    nombre: initialData ? initialData.nombre : '',
    longitud: initialData ? initialData.longitud : '',
    latitud: initialData ? initialData.latitud : '',
    fk_id_finca: initialData ? initialData.fk_id_finca : ''
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
  const validarNombreLote = nombre => {
    const soloLetras = /^[a-zA-Z\s]*$/;
    return soloLetras.test(nombre);
  };
  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      if (!formData.nombre || !formData.longitud || !formData.latitud || !formData.fk_id_finca) {
        setShowWarning(true); // Mostrar advertencia si algún campo está vacío
        return;
      }
      if (!validarNombreLote(formData.nombre)) {
        // Mostrar alerta si el nombre contiene números
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El nombre del lote solo puede contener letras'
        });
        return;
      }

      if (mode === 'registro') {
        const response = await axios.post(
          'http://localhost:3000/Registrarlote',
          formData,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        console.log(response.data);
        // Mostrar alerta de registro exitoso
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'El lote se ha registrado exitosamente'
        });
        console.log(response.data);
      } else if (mode === 'update') {
        const { id } = initialData;
        await axios.put(
          `http://localhost:3000/Actualizarlote/${id}`,
          formData
        );
        // Mostrar alerta de actualización exitosa
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'El lote se ha actualizado exitosamente'
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
      {showWarning && ( // Mostrar advertencia si showWarning es true
        <p style={{ color: 'red', marginBottom: '10px' }}>
          Por favor complete todos los campos
        </p>
      )}
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          Nombre del lote:{' '}
        </label>
        <br />
        <input
          style={{
            borderColor: '#1bc12e',
            borderRadius: '6px',
            width: '50%',
            height: '40px'
          }}
          type="text"
          name="nombre"
          placeholder="Nombre del lote"
          value={formData.nombre}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          Longitud:{' '}
        </label>
        <br />
        <input
          style={{
            borderColor: '#1bc12e',
            borderRadius: '6px',
            width: '50%',
            height: '40px'
          }}
          type="number"
          name="longitud"
          placeholder="longitud"
          value={formData.longitud}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          latitud:{' '}
        </label>
        <br />
        <input
          style={{
            borderColor: '#1bc12e',
            borderRadius: '6px',
            width: '50%',
            height: '40px'
          }}
          type="number"
          name="latitud"
          placeholder="latitud"
          value={formData.latitud}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          id finca:{' '}
        </label>
        <br />
        <input
          style={{
            borderColor: '#1bc12e',
            borderRadius: '6px',
            width: '50%',
            height: '40px'
          }}
          type="number"
          name="fk_id_finca"
          placeholder="Fk_id_finca"
          value={formData.fk_id_finca}
          onChange={handleChange}
        />
      </div>
      <button
        className="boton"
        type="submit"
        style={{
          backgroundColor: '#1bc12e',
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
        {mode === 'registro' ? 'Registrar' : 'Actualizar'}
      </button>
    </form>
  );
};

export default Formulariolote;
