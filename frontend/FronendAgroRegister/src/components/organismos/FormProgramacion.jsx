import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa SweetAlert

const Formulariocultivo = ({ onSubmit, className, initialData, mode, cerrarModal }) => {
  const initialFormData = {
    fecha_inicio: initialData && initialData.fecha_inicio ? initialData.fecha_inicio : '',
    fecha_fin: initialData && initialData.fecha_fin ? initialData.fecha_fin : '',
    fk_id_usuario: initialData && initialData.fk_id_usuario ? initialData.fk_id_usuario : '',
    fk_id_actividad: initialData && initialData.fk_id_actividad ? initialData.fk_id_actividad: '',
    fk_id_cultivo: initialData && initialData.fk_id_cultivo ? initialData.fk_id_cultivo : ''
  };
  
  const [formData, setFormData] = useState(initialFormData);
  const [showWarning, setShowWarning] = useState(false); // Estado para mostrar la advertencia

  // Nuevo estado para almacenar los nombres de los usuarios, actividades y cultivos
  const [nombre, setNombreUsuario] = useState([]);
  const [nombre_actividad, setNombreActividad] = useState([]);
  const [id_cultivo, setIdCultivo] = useState([]);

  
  // Obtener los nombres de los lotes y variedades al cargar el componente
  useEffect(() => {
    axios.get('http://localhost:3000/listarUsuario')
      .then(response => {
        setNombreUsuario(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
      
    axios.get('http://localhost:3000/listarVariedades')
      .then(response => {
        setNombreActividad(response.data);
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
          Selecciona tu Lote:
        </label>
        <br />
        <select
          label='Nombre de Lote'
          name='fk_id_lote'
          style={{borderColor: '#1bc12e', width: '50%', height: '40px',  borderRadius: '6px'}}
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
          style={{borderColor: '#1bc12e', width: '50%', height: '40px',  borderRadius: '6px'}}
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

export default Formulariocultivo;
