import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa SweetAlert

const FormularioProgramacion = ({ onSubmit, className, initialData, mode, cerrarModal }) => {
  const initialFormData = {
    fecha_inicio: initialData && initialData.fecha_inicio ? initialData.fecha_inicio : '',
    fecha_fin: initialData && initialData.fecha_fin ? initialData.fecha_fin : '',
    fk_id_usuario: initialData && initialData.fk_id_usuario ? initialData.fk_id_usuario : '',
    fk_id_actividad: initialData && initialData.fk_id_actividad ? initialData.fk_id_actividad : '',
    fk_id_cultivo: initialData && initialData.fk_id_cultivo ? initialData.fk_id_cultivo : ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showWarning, setShowWarning] = useState(false); // Estado para mostrar la advertencia

  // Nuevo estado para almacenar los nombres de los usuarios, actividades y cultivos
  const [nombre, setNombreUsuario] = useState([]);
  const [nombre_actividad, setNombreActividad] = useState([]);
  const [id_cultivo, setIdCultivo] = useState([]);


  // Obtener los nombres de usuarios, los nombres de las actividades y los id de los cultivos al cargar el componente
  useEffect(() => {
    axios.get('http://localhost:3000/listarUsuario')
      .then(response => {
        setNombreUsuario(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });

    axios.get('http://localhost:3000/listarActividad')
      .then(response => {
        setNombreActividad(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });

    axios.get('http://localhost:3000/listarCultivos')
      .then(response => {
        setIdCultivo(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });




  }, []);

  // Restablecer la advertencia cuando cambia lo seleccionado eleccionado
  useEffect(() => {
    setShowWarning(false);
  }, [formData.fk_id_usuario]);

  useEffect(() => {
    setShowWarning(false);
  }, [formData.fk_id_actividad]);

  useEffect(() => {
    setShowWarning(false);
  }, [formData.fk_id_cultivo]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };



  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.fecha_inicio || !formData.fecha_fin || !formData.fk_id_usuario || !formData.fk_id_actividad || !formData.fk_id_cultivo) {
        setShowWarning(true);
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

      const fechaFin = formData.fecha_fin;
      if (!fechaFin || !Date.parse(fechaFin)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La fecha fin debe estar en formato ISO 8601 (YYYY-MM-DD)'
        });
        return;
      }

      if (mode === 'registro') {
        const response = await axios.post(
          'http://localhost:3000/registrarProgramacion',
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
          text: 'La programación se ha registrado exitosamente'
        });
        console.log(response.data);
      } else if (mode === 'update') {
        const { id } = initialData;
        await axios.put(
          `http://localhost:3000/actualizarProgramacion/${id}`,
          formData
        );
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'La programacion se ha actualizado exitosamente'
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
          Fecha Fin:{' '}
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
          name="fecha_fin"
          placeholder="Fecha Fin"
          value={formData.fecha_fin}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          Selecciona tu Usuario:
        </label>
        <br />
        <select
          label='Nombre de Usuario'
          name='fk_id_usuario'
          style={{ borderColor: '#1bc12e', width: '50%', height: '40px', borderRadius: '6px' }}
          id=''
          required={true}
          value={formData.fk_id_usuario}
          onChange={handleChange}
        >
          <option value="" disabled>Seleccione</option>
          {nombre.map(usuarios => (
            <option key={usuarios.id_usuario} value={usuarios.id_usuario}>
              {usuarios.nombre}
            </option>
          ))}
        </select>
      </div>
      {showWarning && (
        <p style={{ color: 'red', marginBottom: '10px' }}>
          Por favor selecciona tu Usuario
        </p>
      )}
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          Selecciona tu Actividad:
        </label>
        <br />
        <select
          label='Nombre de la Actividad'
          name='fk_id_actividad'
          style={{ borderColor: '#1bc12e', width: '50%', height: '40px', borderRadius: '6px' }}
          id=''
          required={true}
          value={formData.fk_id_actividad}
          onChange={handleChange}
        >
          <option value="" disabled>Seleccione</option>
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
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          Selecciona tu Cultivo:
        </label>
        <br />
        <select
          label='Nombre del Cultivo'
          name='fk_id_cultivo'
          style={{ borderColor: '#1bc12e', width: '50%', height: '40px', borderRadius: '6px' }}
          id=''
          required={true}
          value={formData.fk_id_cultivo}
          onChange={handleChange}
        >
          <option value="" disabled>Seleccione</option>
          {id_cultivo.map(cultivo => (
            <option key={cultivo.id_cultivo} value={cultivo.id_cultivo}>
              {cultivo.id_cultivo}
            </option>
          ))}
        </select>
      </div>
      {showWarning && (
        <p style={{ color: 'red', marginBottom: '10px' }}>
          Por favor seleccione el id de tu Cultivo
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

export default FormularioProgramacion;
