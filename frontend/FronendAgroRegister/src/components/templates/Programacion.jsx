import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaRegEdit } from 'react-icons/fa';
import { RiPlantFill } from "react-icons/ri";
import Botones from "../atomos/BotonRegiApi.jsx";
import { Datatable } from "../moleculas/Datatable";
import ModalRecuRegeContrasenia from "../organismos/ModalProgramacion.jsx";
import ModalEstadoProgramacion from "../organismos/ModalEstadoProgramacion.jsx";
import Header from "../organismos/Header/Header";
import Footer from '../organismos/Footer/Footer';
import SearchBar from '../moleculas/SearchBar';
import Swal from 'sweetalert2';
import { format } from 'date-fns'; // Importa la función format de date-fns

function Programacion() {


  const [data, setData] = useState([]);
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [showActualizacionModal, setShowActualizacionModal] = useState(false);
  const [showEstadoModal, setShowEstadoModal] = useState(false);
  const [registroFormData, setRegistroFormData] = useState({});
  const [mode, setMode] = useState('create');
  const [initialData, setInitialData] = useState(null);
  const [actualizacionInitialData, setActualizacionInitialData] = useState(null); // Nuevo estado
  const [originalData, setOriginalData] = useState([]);
  const [error, setError] = useState(null);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const baseURL = 'http://localhost:3000/listarProgramacion';
      const respuesta = await axios.get(baseURL, {
        headers: {
          'token': token
        }
      });
      setData(respuesta.data);
      setOriginalData(respuesta.data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  const handleOpenRegistroModal = () => setShowRegistroModal(true);
  const handleCloseRegistroModal = async (newData) => {
    try {
      setShowRegistroModal(false);
      if (newData) {
        // Actualizar tanto data como originalData
        const updatedData = [...data, newData];
        setData(updatedData);
        setOriginalData(updatedData);
        // Recargar la lista de empleados después de registrar uno nuevo
        await fetchData();
      }
    } catch (error) {
      console.error('Error al cerrar el modal de registro:', error);
    }
  };

  const handleOpenEstadoModal = (rowData) => {
    console.log('Opening Estado Modal with data:', rowData);
    setInitialData(rowData); // Establece initialData directamente desde rowData
    setShowEstadoModal(true);
  };

  const handleCloseEstadoModal = () => {
    setInitialData(null); // Limpia initialData al cerrar el modal
    setShowEstadoModal(false);
  };

  const handleOpenActualizacionModal = (rowData) => {
    setActualizacionInitialData(rowData);
    setMode('update');
    setShowActualizacionModal(true);
  };

  const handleCloseActualizacionModal = () => {
    setActualizacionInitialData(null);
    setShowActualizacionModal(false);
  };

  const handleActualizacionFormSubmit = async (formData) => {
    try {
      console.log('Actualización de la programación:', formData);
      const token = localStorage.getItem('token');
      if (!token) {
        // Manejar el caso en que el token no esté presente
        console.error('No se encontró el token en el localStorage');
        return;
      }
      const { id } = formData;
      const response = await axios.put(`http://localhost:3000/actualizarProgramacion/${id}`, formData, {
        headers: {
          'token': token
        }
      });

      if (response.status === 200) {
        console.log('Programación actualizado exitosamente.');
        fetchData();
        setShowActualizacionModal(false);
      } else {
        console.error('Error al actualizar la programación:', response.data);
      }
    } catch (error) {
      console.error('Error al actualizar las programaciones:', error);
    }
  };


  const handleSearch = async (searchTerm) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Manejar el caso en que el token no esté presente
        console.error('No se encontró el token en el localStorage');
        return;
      }

      if (searchTerm.trim() === '') {
        setData(originalData);
        setError(null);
      } else {
        const response = await axios.get(`http://localhost:3000/buscarProgramacion/${searchTerm}`, {
          headers: {
            'token': token
          }
        });
        setData(response.data);
        if (response.data.length === 0) {
          setError('No se encontraron resultados');
        } else {
          setError(null);
        }
      }
    } catch (error) {
      console.error('Error searching for resources:', error);
      setError('Busqueda no encontrada');
    }
  };

  const handleEstadoSeleccionado = (event) => {
    setEstadoSeleccionado(event.target.value);
    if (event.target.value === '') {
      setData(originalData);
    } else {
      const filteredData = originalData.filter(item => item.estado === event.target.value);
      setData(filteredData);
    }
  };

  const handleEstadoSubmit = async (formData) => {
    try {
      console.log('Manejando envío de formulario de estado:', formData);
      console.log('initialData:', initialData);
      if (initialData) {
        const { id_programacion } = initialData;

        // Verificar si se ha seleccionado un estado
        if (!formData.estado) {
          // Mostrar mensaje de error si no se ha seleccionado un estado
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor seleccione un estado',
          });
          return;
        }

        // Mostrar mensaje de confirmación antes de cambiar el estado
        const result = await Swal.fire({
          title: 'Confirmación',
          text: '¿Estás seguro de cambiar el estado?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'green',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, cambiar estado',
          cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
          // Realizar la solicitud PUT solo si se confirma la acción
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('No se encontró el token en el localStorage');
            return;
          }
          await axios.put(`http://localhost:3000/desactivar/Programacion/${id_programacion}`, { estado: formData.estado }, {
            headers: {
              'token': token
            }
          });
          fetchData();
          setShowEstadoModal(false);
          // Mostrar mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Estado cambiado exitosamente',
          });
          console.log('Solicitud PUT exitosa');
        }
      }
    } catch (error) {
      console.error('Error al enviar el formulario de estado:', error);
    }
  };

  // En la definición de las columnas, modifica la columna "Acciones":
  const columns = [
    {
      name: 'Editar',
      cell: (row) => (
        <button
          className="btn p-2 rounded-lg"
          style={{ backgroundColor: '#B5B5B5', borderColor: '#ffc107', marginLeft: '10px', border: 'none' }}
          type="button"
          onClick={() => handleOpenActualizacionModal(row)}
        >
          <FaRegEdit style={{ color: 'black' }} />
        </button>
      ),
    },
    {
      name: 'Empleados',
      selector: (row) => row.nombre_usuario,
      sortable: true,
    },
    {
      name: 'Actividad',
      selector: (row) => row.nombre_actividad,
      sortable: true,
    },
    {
      name: 'Variedad C',
      selector: (row) => row.nombre_variedad,
      sortable: true,
    },
    {
      name: 'Fecha Inicio',
      selector: (row) => format(new Date(row.fecha_inicio), 'dd/MM/yyyy'), // Formatea la fecha
      sortable: true,
    },
    {
      name: 'Fecha Fin',
      selector: (row) => format(new Date(row.fecha_fin), 'dd/MM/yyyy'), // Formatea la fecha
      sortable: true,
    },
    {
      name: 'Estado',
      cell: (row) => (
        <span style={{
          color: row.estado === 'activo' ? 'green' :
            row.estado === 'ejecutandose' ? 'orange' :
              row.estado === 'terminado' ? 'red' :
                'grey', fontWeight: '700'
        }}>
          {row.estado}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: (row) => {
        const [hover, setHover] = useState(false);

        return (
          <>
            {row.estado !== 'terminado' && (
              <button
                className="btn p-2 rounded-lg"
                style={{
                  backgroundColor: hover ? '#3b5bb3' : '#466AD6',
                  borderColor: '#ffc107',
                  color: 'white',
                  width: '70%',
                  border: 'none',
                  marginLeft: '-16px',
                }}
                type="button"
                onClick={() => handleOpenEstadoModal(row)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <RiPlantFill style={{ color: 'white' }} /> Estado
              </button>
            )}
          </>
        );
      },
    },
  ];

  return (
    <div>
      <div className="recursos-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div className="main-content" style={{ flex: 1 }}>
          <div style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)', padding: '20px', marginBottom: '20px', borderRadius: '7px', marginTop: '100px', position: 'relative' }}>
            <SearchBar onSearch={handleSearch} />
            <Botones children="Registrar" onClick={handleOpenRegistroModal} />
            <select
              style={{
                position: 'absolute',
                marginTop: '-36px',
                marginLeft: '920px',
                padding: '8px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                background: 'linear-gradient(to bottom, #ffffff 0%, #f9f9f9 100%)',
                boxShadow: 'rgba(0, 0, 0, 6.1) 0px 0px 8px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                width: '133px',
              }}
              value={estadoSeleccionado}
              onChange={handleEstadoSeleccionado}
            >
              <option value="">Estados</option>
              <option value="activo">Activo</option>
              <option value="ejecutandose">Ejecutandose</option>
              <option value="inactivo">Inactivo</option>
              <option value="terminado">Terminado</option>
            </select>
          </div>

          <br />
          {error ? (
            <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
          ) : (
            <Datatable columns={columns} data={data} title="Asignaciones" />
          )}
        </div>

        <ModalRecuRegeContrasenia
          mostrar={showRegistroModal}
          cerrarModal={handleCloseRegistroModal}
          titulo="Registro"
          actionLabel="Registrar"
          initialData={registroFormData}
          mode="registro"
          handleSubmit={handleCloseRegistroModal}
        />

        <ModalRecuRegeContrasenia
          mostrar={showActualizacionModal}
          cerrarModal={handleCloseActualizacionModal}
          titulo="Actualización"
          handleSubmit={handleActualizacionFormSubmit}
          actionLabel="Actualizar"
          initialData={actualizacionInitialData}
          mode={mode}
        />

        <ModalEstadoProgramacion
          titulo="Cambiar Estado de Programación"
          mostrar={showEstadoModal}
          cerrarModal={handleCloseEstadoModal}
          handleSubmit={handleEstadoSubmit}
          initialData={initialData}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Programacion;