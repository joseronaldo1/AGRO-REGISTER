import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import Botones from "../atomos/BotonRegiApi.jsx";
import { Datatable } from "../moleculas/Datatable";
import ModalRecuRegeContrasenia from "../organismos/ModalProgramacion.jsx";
import Header from "../organismos/Header/Header";
import Footer from '../organismos/Footer/Footer';
import SearchBar from '../moleculas/SearchBar';
import Swal from 'sweetalert2';

function Programacion() {
  const baseURL = 'http://localhost:3000/listarProgramacion';

  const [data, setData] = useState([]);
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [showActualizacionModal, setShowActualizacionModal] = useState(false);
  const [registroFormData, setRegistroFormData] = useState({});
  const [mode, setMode] = useState('create');
  const [initialData, setInitialData] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [error, setError] = useState(null);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(baseURL);
      setData(response.data);
      setOriginalData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleOpenRegistroModal = () => setShowRegistroModal(true);
  const handleCloseRegistroModal = () => setShowRegistroModal(false);

  const handleOpenActualizacionModal = (rowData) => {
    const updatedInitialData = { ...rowData, id: rowData.id_programacion };
    setInitialData(updatedInitialData);
    setMode('update');
    setShowActualizacionModal(true);
  };

  const handleCloseActualizacionModal = () => {
    setInitialData(null);
    setShowActualizacionModal(false);
  };

  const handleActualizacionFormSubmit = async (formData) => {
    try {
      console.log('Actualización de recurso:', formData);
      const { id } = formData;
      await axios.put(`http://localhost:3000/actualizarProgramacion/${id}`, formData);
      fetchData();
      setShowActualizacionModal(false);
    } catch (error) {
      console.error('Error al actualizar la programacion:', error);
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      if (searchTerm.trim() === '') {
        setData(originalData);
        setError(null);
      } else {
        const response = await axios.get(`http://localhost:3000/buscarProgramacion/${searchTerm}`);
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

  const handleEstadoBotonClick = async (id, estado) => {
    try {
      let newEstado;
      let confirmMessage;
      switch (estado) {
        case 'activo':
          confirmMessage = '¿Deseas marcar esta actividad como ejecutándose?';
          break;
        case 'ejecutandose':
          confirmMessage = '¿Deseas marcar esta actividad como inactiva?';
          break;
        case 'inactivo':
          confirmMessage = '¿Deseas marcar esta actividad como terminada?';
          break;
        case 'terminado':
          confirmMessage = '¿Deseas marcar esta actividad como activa nuevamente?';
          break;
        default:
          break;
      }

      const { isConfirmed } = await Swal.fire({
        title: '¿Estás seguro?',
        text: confirmMessage,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
      });

      if (!isConfirmed) {
        return; // Si el usuario cancela, salimos de la función sin hacer nada
      }

      switch (estado) {
        case 'activo':
          newEstado = 'ejecutandose';
          break;
        case 'ejecutandose':
          newEstado = 'inactivo';
          break;
        case 'inactivo':
          newEstado = 'terminado';
          break;
        case 'terminado':
          newEstado = 'activo';
          break;
        default:
          break;
      }

      await axios.put(`http://localhost:3000/desactivar/Programacion/${id}`, { estado: newEstado });
      fetchData();

      // Mostrar mensaje solo si la acción se completó con éxito
      if (newEstado) {
        Swal.fire('¡Listo!', `El estado de la actividad se ha cambiado a: ${newEstado}`, 'success');
      }
    } catch (error) {
      console.error('Error al cambiar el estado de la actividad:', error);
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

  const columns = [
    {
      name: 'Editar',
      cell: (row) => (
        <button
          className="btn p-2 rounded-lg"
          style={{ backgroundColor: '#975C29', borderColor: '#ffc107', marginLeft: '10px', border: 'none' }}
          type="button"
          onClick={() => handleOpenActualizacionModal(row)}
        >
          <FaEdit style={{ color: 'white' }} />
        </button>
      ),
    },
    {
      name: 'Nombre Usuario',
      selector: (row) => row.nombre || row.usuario,
      sortable: true,
    },
    {
      name: 'Nombre Actividad',
      selector: (row) => row.nombre_actividad ,
      sortable: true,
    },
    {
      name: 'ID Cultivo',
      selector: (row) => row.id_cultivo,
      sortable: true,
    },
    {
      name: 'Fecha Inicio',
      selector: (row) => row.fecha_inicio,
      sortable: true,
    },
    {
      name: 'Fecha Fin',
      selector: (row) => row.fecha_fin,
      sortable: true,
    },
    {
      name: 'Estado',
      cell: (row) => (
        <span style={{
          color: row.estado === 'activo' ? 'green' :
            row.estado === 'ejecutandose' ? 'orange' :
              row.estado === 'terminado' ? '#2A5CB5' :
                'red', fontWeight: '700'
        }}>
          {row.estado}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <>
          {row.estado === 'terminado' ? null : (
            <button
              className="btn p-2 rounded-lg estado-button"
              style={{
                backgroundColor: row.estado === 'activo' ? 'orange' : row.estado === 'ejecutandose' ? '#E83333' : row.estado === 'inactivo' ? '#366BED' : '#3484F0',
                border: 'none',
                color: 'white',
                height: '40px',
                width: '100px',
                marginLeft: '-18px',
                transition: 'background-color 0.2s',
              }}
              type="button"
              onClick={() => handleEstadoBotonClick(row.id_programacion, row.estado)}
              onMouseEnter={(e) => { e.target.style.backgroundColor = row.estado === 'activo' ? '#DC9E24' : row.estado === 'ejecutandose' ? '#F75050' : row.estado === 'inactivo' ? '#3484F0' : '#2DBC28' }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = row.estado === 'activo' ? 'orange' : row.estado === 'ejecutandose' ? '#E83333' : row.estado === 'inactivo' ? '#366BED' : '#2A5CB5' }}
            >
              {row.estado === 'activo' ? 'Ejecutar' : row.estado === 'ejecutandose' ? 'Desactivar' : 'Terminar'}
            </button>
          )}
        </>
      ),
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
                marginLeft: '500px',
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
            <Datatable columns={columns} data={data} title="Programacion" />
          )}
        </div>

        <ModalRecuRegeContrasenia
          mostrar={showRegistroModal}
          cerrarModal={handleCloseRegistroModal}
          titulo="Registro"
          actionLabel="Registrar"
          initialData={registroFormData}
          mode="registro"
          handleSubmit={() => setShowRegistroModal(false)}
        />
        <ModalRecuRegeContrasenia
          mostrar={showActualizacionModal}
          cerrarModal={handleCloseActualizacionModal}
          titulo="Actualización"
          handleSubmit={handleActualizacionFormSubmit}
          actionLabel="Actualizar"
          initialData={initialData}
          mode={mode}
        />
        <br />
      </div>
      <Footer />
    </div>
  );
}

export default Programacion;
