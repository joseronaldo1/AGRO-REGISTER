import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';



const FormularioProgramacion = ({ onSubmit, className, initialData, mode, cerrarModal }) => {
  const [formData, setFormData] = useState({
    nombre_actividad: initialData?.nombre_actividad || '',
    tiempo: initialData?.tiempo || '',
    observaciones: initialData?.observaciones || '',
    valor_actividad: initialData?.valor_actividad || '',
    fk_id_variedad: initialData?.fk_id_variedad || '',
    id: initialData?.id_actividad || '' 
  });

  useEffect(() => {
    setFormData({
      nombre_actividad: initialData?.nombre_actividad || '',
      tiempo: initialData?.tiempo || '',
      observaciones: initialData?.observaciones || '',
      valor_actividad: initialData?.valor_actividad || '',
      fk_id_variedad: initialData?.fk_id_variedad || '',
      id: initialData?.id_actividad || ''  
    });
  }, [initialData]);

  const [showWarning, setShowWarning] = useState(false);
  const [nombreVariedad, setNombreVariedad] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/listarVariedades')
      .then(response => {
        setNombreVariedad(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de variedad:', error);
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validarNombreActividad = nombre_actividad => {
    const soloLetras = /^[a-zA-Z\s]*$/;
    return soloLetras.test(nombre_actividad);
  };

  const validarObservaciones = observaciones => {
    const soloLetras = /^[a-zA-Z\s]*$/;
    return soloLetras.test(observaciones);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.nombre_actividad || !formData.tiempo || !formData.observaciones || !formData.fk_id_variedad) {
        setShowWarning(true);
        return;
      }
      if (!validarNombreActividad(formData.nombre_actividad)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El nombre de la actividad solo puede contener letras'
        });
        return;
      }

      const tiempo = formData.tiempo;
      if (!tiempo || !/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(tiempo)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El campo tiempo debe tener el formato HH:MM:SS'
        });
        return;
      }

      if (!validarObservaciones(formData.observaciones)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La observación solo puede contener letras'
        });

        return;
      }
      if (mode === 'registro') {
        const response = await axios.post(
          'http://localhost:3000/RegistrarActividad',
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
          text: 'La actividad se ha registrado exitosamente'
        });
        console.log(response.data);
      } else if (mode === 'update') {
        const { id_actividad } = initialData; // Utiliza el campo correcto del ID
        await axios.put(
          `http://localhost:3000/ActualizarActividad/${id_actividad}`,
          formData
        );
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'La actividad se ha actualizado exitosamente'
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
          Nombre de la Actividad:{' '}
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
          name="nombre_actividad"
          placeholder="Nombre de la actvidad"
          value={formData.nombre_actividad}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          Tiempo:{' '}
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
          name="tiempo"
          placeholder="Formato: HH:MM:SS"
          value={formData.tiempo}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          Observaciones:{' '}
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
          name="observaciones"
          placeholder="observaciones"
          value={formData.observaciones}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          Valor de la Actividad:{' '}
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
          name="valor_actividad"
          placeholder="Valor de la Actividad"
          value={formData.valor_actividad}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
          Selecciona tu Variedad:
        </label>
        <br />
        <select
          label='Nombre de Variedad'
          name='fk_id_variedad'
          style={{ borderColor: '#1bc12e', width: '50%', height: '40px', borderRadius: '6px' }}
          required={true}
          value={formData.fk_id_variedad}
          onChange={handleChange}
        >
          <option value="" disabled>Seleccione</option>
          {nombreVariedad.map(variedad => (
            <option key={variedad.id_variedad} value={variedad.id_variedad}>
              {variedad.nombre_variedad}
            </option>
          ))}
        </select>
      </div>

      {showWarning && (
        <p style={{ color: 'red', marginBottom: '10px' }}>
          Por favor seleccione una variedad
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