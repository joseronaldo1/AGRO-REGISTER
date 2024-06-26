import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa SweetAlert

const Formulario = ({ onSubmit, className, initialData, mode, cerrarModal }) => {
  const initialFormData = {
    nombre_recursos: initialData ? initialData.nombre_recursos : '',
    cantidad_medida: initialData ? initialData.cantidad_medida : '',
    unidades_medida: initialData ? initialData.unidades_medida : '',
    extras: initialData ? initialData.extras : ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showWarning, setShowWarning] = useState(false); // Estado para mostrar la advertencia
  const [showNameError, setShowNameError] = useState(false); // Estado para mostrar el error de nombre

  const handleChange = e => {
    const { name, value } = e.target;

    // Validar que el campo "nombre_recursos" solo contenga letras
    if (name === 'nombre_recursos' && !/^[A-Za-z\s]+$/.test(value)) {
      setShowNameError(true); // Activar el estado para mostrar el error de nombre
    } else {
      setShowNameError(false); // Desactivar el estado de error de nombre si es válido
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      // Verificar si algún campo está vacío
      if (
        !formData.nombre_recursos ||
        !formData.cantidad_medida ||
        !formData.unidades_medida ||
        !formData.extras
      ) {
        setShowWarning(true); // Mostrar advertencia si algún campo está vacío
        return;
      }

      // Validar el nombre del recurso antes de enviar el formulario
      if (showNameError) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El nombre de recursos solo puede contener letras'
        });
        return;
      }

      // Si todos los campos están completos, continuar con el envío del formulario
      if (mode === 'registro') {
        const response = await axios.post(
          'http://localhost:3000/RegistroRecurso',
          { ...formData },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        console.log(response.data);
        // Mostrar alerta de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'El recurso se registró correctamente.'
        });
      } else if (mode === 'update') {
        const { id } = initialData;
        await axios.put(
          `http://localhost:3000/actualizarRecurso/${id}`,
          formData
        );
        // Mostrar alerta de éxito para la actualización
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'El recurso se actualizó correctamente.'
        });
      }

      onSubmit(formData);
      cerrarModal();
    } catch (error) {
      console.error('Error al procesar el formulario:', error);
    }
  };

  return (
    <form className={className} onSubmit={handleFormSubmit} style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      {showWarning && ( // Mostrar advertencia si showWarning es true
        <p style={{ color: 'red', marginBottom: '10px' }}>
          Por favor complete todos los campos
        </p>
      )}
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>Nombre Recurso: </label>
        <br />
        <input style={{ borderColor: '#1bc12e', borderRadius: '6px', width: '50%', height: '40px' }}
          type="text"
          name="nombre_recursos"
          placeholder="Nombre de Recursos"
          value={formData.nombre_recursos}
          onChange={handleChange}
        />
        {showNameError && ( // Mostrar el error de nombre si showNameError es true
          <p style={{ color: 'red', marginBottom: '10px' }}>
            El nombre de recursos solo puede contener letras
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>Cantidad: </label>
        <br />
        <input style={{ borderColor: '#1bc12e', borderRadius: '6px', width: '50%', height: '40px' }}
          type="number"
          name="cantidad_medida"
          placeholder="Cantidad"
          value={formData.cantidad_medida}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>Unidades Medida: </label>
        <br />
        <select
          style={{ borderColor: '#1bc12e', borderRadius: '6px', width: '50%', height: '40px' }}
          name="unidades_medida"
          value={formData.unidades_medida}
          onChange={handleChange}
        >
          <option value="">Seleccione...</option>
          <option value="ml">ml</option>
          <option value="litro">litro</option>
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="unidad">unidad</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>Extras: </label>
        <br />
        <input style={{ borderColor: '#1bc12e', borderRadius: '6px', width: '50%', height: '40px' }}
          type="text"
          name="extras"
          placeholder="Extras"
          value={formData.extras}
          onChange={handleChange}
        />
      </div>
      <button className="boton" type="submit" style={{ backgroundColor: '#1bc12e', borderRadius: '10px', color: 'white', border: 'none', marginLeft: '3%', width: '20%', fontSize: '17px', marginTop: '20px', height: '40px' }}>
        {mode === 'registro' ? 'Registrar' : 'Actualizar'}
      </button>
    </form>
  );
};

export default Formulario;
