import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa SweetAlert

const Formulariocultivo = ({ onSubmit, className, initialData, mode, cerrarModal }) => {
  const initialFormData = {
    fecha_inicio: initialData && initialData.fecha_inicio ? initialData.fecha_inicio : '',
    cantidad_sembrada: initialData && initialData.cantidad_sembrada ? initialData.cantidad_sembrada : '',
    fk_id_lote: initialData && initialData.fk_id_lote ? initialData.fk_id_lote : '',
    fk_id_variedad: initialData && initialData.fk_id_variedad ? initialData.fk_id_variedad : ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showWarning, setShowWarning] = useState(false); // Estado para mostrar la advertencia

  // Nuevo estado para almacenar los nombres de los lotes y variedades
  const [nombre_lote, setNombreLote] = useState([]);
  const [nombre_variedad, setNombreVariedad] = useState([]);

  // Obtener los nombres de los lotes y variedades al cargar el componente
  useEffect(() => {
    axios.get('http://localhost:3000/listarlote')
      .then(response => {
        setNombreLote(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });

    axios.get('http://localhost:3000/listarVariedades')
      .then(response => {
        setNombreVariedad(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  // Restablecer la advertencia cuando cambia el lote seleccionado
  useEffect(() => {
    setShowWarning(false);
  }, [formData.fk_id_lote]);

  useEffect(() => {
    setShowWarning(false);
  }, [formData.fk_id_variedad]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validarCantidadSembrada = cantidad_sembrada => {
    const soloNumeros = /^\d+$/;
    return soloNumeros.test(cantidad_sembrada);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.fecha_inicio || !formData.cantidad_sembrada || !formData.fk_id_lote || !formData.fk_id_variedad) {
        setShowWarning(true);
        return;
      }

      if (!validarCantidadSembrada(formData.cantidad_sembrada)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La cantidad sembrada debe contener solo números'
        });
        return;
      }

      const fechaInicio = formData.fecha_inicio;
      if (!fechaInicio || !Date.parse(fechaInicio)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La fecha de inicio debe estar en formato ISO 8601 (YYYY-MM-DD)'
        });
        return;
      }

      if (mode === 'registro') {
        const response = await axios.post(
          'http://localhost:3000/registrarCultivos',
          formData,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'El cultivo se ha registrado exitosamente'
        });
        console.log(response.data);
      } else if (mode === 'update') {
        const { id } = initialData;
        await axios.put(
          `http://localhost:3000/actualizarCultivo/${id}`,
          formData
        );
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'El cultivo se ha actualizado exitosamente'
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
          Selecciona tu Lote:
        </label>
        <br />
        <select
          label='Nombre de Lote'
          name='fk_id_lote'
          style={{ borderColor: '#1bc12e', width: '50%', height: '40px', borderRadius: '6px' }}
          id=''
          required={true}
          value={formData.fk_id_lote}
          onChange={handleChange}
        >
          <option value="" disabled>Seleccione</option>
          {nombre_lote.map(lote => (
            <option key={lote.id_lote} value={lote.id_lote}>
              {lote.nombre}
            </option>
          ))}
        </select>
      </div>
      {showWarning && (
        <p style={{ color: 'red', marginBottom: '10px' }}>
          Por favor seleccione un lote
        </p>
      )}
         <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          Selecciona tu Variedad:
        </label>
        <br />
        <select
          label='Nombre de Variedad'
          name='fk_id_variedad'
          style={{ borderColor: '#1bc12e', width: '50%', height: '40px', borderRadius: '6px' }}
          id=''
          required={true}
          value={formData.fk_id_variedad}
          onChange={handleChange}
        >
          <option value="" disabled>Seleccione</option>
          {nombre_variedad.map(variedad => (
            <option key={variedad.id_variedad} value={variedad.id_variedad}>
              {variedad.nombre_variedad}
            </option>
          ))}
        </select>
      </div>
      {showWarning && (
        <p style={{ color: 'red', marginBottom: '10px' }}>
          Por favor seleccione una Variedad
        </p>
      )}
            <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          Cantidad Sembrada:{' '}
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
          name="cantidad_sembrada"
          placeholder="Cantidad Sembrada"
          value={formData.cantidad_sembrada}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          Fecha de inicio:{' '}
        </label>
        <br />
        <input
          style={{
            borderColor: '#1bc12e',
            borderRadius: '6px',
            width: '50%',
            height: '40px'
          }}
          type="date"
          name="fecha_inicio"
          placeholder="Fecha de Inicio"
          value={formData.fecha_inicio}
          onChange={handleChange}
        />
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
        {mode === 'registro' ? 'Registrar' : 'Actualizar'}
      </button>
    </form>
  );
};

export default Formulariocultivo;
