import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa SweetAlert

const Formulariolote = ({ onSubmit, className, initialData, mode, cerrarModal }) => {
  const initialFormData = {
    cantidad_produccion: initialData && initialData.cantidad_produccion ? initialData.cantidad_produccion : '',
    precio: initialData && initialData.precio ? initialData.precio : '',
    fk_id_actividad: initialData && initialData.fk_id_actividad ? initialData.fk_id_actividad : ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showWarning, setShowWarning] = useState(false); // Estado para mostrar la advertencia
  const [nombre_actividad, setNombreFinca] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/listarActividad')
      .then(response => {
        setNombreFinca(response.data); // Establecer directamente los datos de la respuesta en el estado nombre_finca
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);



  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validarCantidadProduccion = cantidad_produccion => {
    const soloNumeros = /^\d+$/;
    return soloNumeros.test(cantidad_produccion);
  };
  const validarPrecio = precio => {
    const soloNumeros = /^\d+$/;
    return soloNumeros.test(precio);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.cantidad_produccion || !formData.precio || !formData.fk_id_actividad) {
        setShowWarning(true); // Mostrar advertencia si algún campo está vacío
        return;
      }
      if (!validarCantidadProduccion(formData.cantidad_produccion)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La cantidad de producción debe contener solo números'
        });
        return;
      }

      if (!validarPrecio(formData.precio)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El precio debe contener solo números'
        });
        return;
      }



      if (mode === 'registro') {
        const response = await axios.post(
          'http://localhost:3000/RegistraProduccion',
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
          text: 'La Producción se ha registrado exitosamente'
        });
        console.log(response.data);
      } else if (mode === 'update') {
        const { id } = initialData;
        await axios.put(
          `http://localhost:3000/ActualizarProduccion/${id}`,
          formData
        );
        // Mostrar alerta de actualización exitosa
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'La Producción se ha actualizado exitosamente'
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
          Cantidad Producción:{' '}
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
          name="cantidad_produccion"
          placeholder="Cantidad Producción"
          value={formData.cantidad_produccion}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          Precio:{' '}
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
          name="precio"
          placeholder="Precio"
          value={formData.precio}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          Selecciona tu Actividad:
        </label>
        <br />
        <select
          label='Nombre de Finca'
          name='fk_id_finca'
          style={{ borderColor: '#1bc12e', width: '50%', height: '40px', borderRadius: '6px' }}
          id=''
          required={true}
          value={formData.fk_id_actividad}
          onChange={handleChange}
        >
          <option value="" disabled selected>Seleccione</option>
          {/* Mapeo para crear las opciones del select */}
          {nombre_actividad.map(actividad => (
            <option key={actividad.id_actividad} value={actividad.id_actividad}>
              {actividad.nombre_actividad}
            </option>
          ))}
        </select>
      </div>
      {showWarning && (
        <p style={{ color: 'red', marginBottom: '10px' }}>
          Por favor seleccione una Actividad
        </p>
      )}
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
        {mode === 'registro' ? 'Registrar' : 'Actualizar'}
      </button>
    </form>
  );
};

export default Formulariolote;
