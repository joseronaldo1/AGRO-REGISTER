import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaEdit } from 'react-icons/fa'; // Importa el icono de edición de FontAwesome
import Botones from "../atomos/BotonRegiApi.jsx";
import { Datatable } from "../moleculas/Datatable";
import ModalRecuRegeContrasenia from "../organismos/ModalActividad.jsx";
import Header from "../organismos/Header/Header";
import Footer from '../organismos/Footer/Footer';
import SearchBar from '../moleculas/SearchBar';

function Actividad() {
  const baseURL = 'http://localhost:3000/listarActividad';

  const [data, setData] = useState([]);
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [showActualizacionModal, setShowActualizacionModal] = useState(false);
  const [registroFormData, setRegistroFormData] = useState({});
  const [mode, setMode] = useState('create'); // Agrega mode al estado
  const [originalData, setOriginalData] = useState([]);
  const [initialData, setInitialData] = useState(null);
  const [error, setError] = useState(null); // Estado para manejar errores
  const [estadoSeleccionado, setEstadoSeleccionado] = useState(''); 

<<<<<<< HEAD

=======
>>>>>>> 7be821d016eefc676955a01b26496d46b92e3738
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
    const updatedInitialData = { ...rowData, id: rowData.id_actividad };
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
      console.log('Actualización de la actividad:', formData);
      const { id } = formData;
      await axios.put(`http://localhost:3000/ActualizarActividad/${id}`, formData);
      fetchData();
      setShowActualizacionModal(false);
    } catch (error) {
      console.error('Error al actualizar la actividad:', error);
    }
  };

<<<<<<< HEAD

  // Función para buscar actividades por nombre
  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(`http://localhost:3000/Buscaractividad/${searchTerm}`);
      setData(response.data);
    } catch (error) {
      console.error('Error searching for resources:', error);
    }
  };
=======
  const handleSearch = async (searchTerm) => {
    try {
      if (searchTerm.trim() === '') {
        setData(originalData);
        setError(null);
      } else {
        const response = await axios.get(`http://localhost:3000/Buscaractividad/${searchTerm}`);
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

>>>>>>> 7be821d016eefc676955a01b26496d46b92e3738
  const handleEstadoBotonClick = async (id, estado) => {
    try {
      let newEstado;
      switch (estado) {
        case 'activo':
          newEstado = 'ejecutandose';
          break;
<<<<<<< HEAD
=======
        case 'inactivo':
          newEstado = 'activo';
          break;
>>>>>>> 7be821d016eefc676955a01b26496d46b92e3738
        case 'ejecutandose':
          newEstado = 'terminado';
          break;
        case 'terminado':
          newEstado = 'inactivo';
          break;
<<<<<<< HEAD
        case 'inactivo':
          newEstado = 'activo';
          break;
=======
>>>>>>> 7be821d016eefc676955a01b26496d46b92e3738
        default:
          break;
      }
      await axios.put(`http://localhost:3000/Desactivara/actividad/${id}`, { estado: newEstado });
<<<<<<< HEAD
      fetchData(); // Actualizar los datos después de la actualización
=======
      fetchData();
>>>>>>> 7be821d016eefc676955a01b26496d46b92e3738
    } catch (error) {
      console.error('Error al cambiar el estado de la actividad:', error);
    }
  };
<<<<<<< HEAD
=======

  const handleEstadoSeleccionado = (event) => {
    setEstadoSeleccionado(event.target.value);
    if (event.target.value === '') {
      setData(originalData);
    } else {
      const filteredData = originalData.filter(item => item.estado === event.target.value);
      setData(filteredData);
    }
  };
>>>>>>> 7be821d016eefc676955a01b26496d46b92e3738

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
      name: 'Nombre Actividad',
      selector: (row) => row.nombre_actividad,
      sortable: true,
    },

    {
      name: 'Nombre Variedad',
      selector: (row) => row.nombre_variedad,
      sortable: true,
    },
    {
      name: 'Tiempo',
      selector: (row) => row.tiempo,
      sortable: true,
    },
    {
      name: 'Observaciones',
      selector: (row) => row.observaciones,
      sortable: true,
    },
    {
      name: 'Valor Actividad',
      selector: (row) => row.valor_actividad,
      sortable: true,
    },
    {
      name: 'Estado',
      cell: (row) => (
        <span style={{
          color:
            row.estado === 'activo' ? 'green' :
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
<<<<<<< HEAD

        <button
          className="btn p-2 rounded-lg estado-button"
          style={{
            backgroundColor: row.estado === 'activo' ? 'orange' : row.estado === 'ejecutandose' ? '#2A5CB5' : row.estado === 'terminado' ? 'red' : 'green',
            border: 'none',
            color: 'white',
            height: '40px',
            width: '100px',
            marginLeft: '-18px',
            transition: 'background-color 0.2s', // Agregar una transición suave al color de fondo
          }}
          type="button"
          onClick={() => handleEstadoBotonClick(row.id_actividad, row.estado)}
          onMouseEnter={(e) => { e.target.style.backgroundColor = row.estado === 'activo' ? '#DC9E24' : row.estado === 'ejecutandose' ? '#377AF0' : row.estado === 'terminado' ? '#E54444' : '#2DBC28' }} // Cambiar el color de fondo al pasar el mouse
          onMouseLeave={(e) => { e.target.style.backgroundColor = row.estado === 'activo' ? 'orange' : row.estado === 'ejecutandose' ? '#2A5CB5' : row.estado === 'terminado' ? 'red' : 'green' }} // Restaurar el color de fondo al dejar de pasar el mouse
        >
          {row.estado === 'activo' ? 'Ejecutar' : row.estado === 'ejecutandose' ? 'Terminar' : row.estado === 'terminado' ? 'Desactivar' : 'Activar'}
        </button>

      ),
    },
  ];

  return (
    <div>
      <div className="recursos-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div className="main-content" style={{ flex: 1 }}>
          {/* Contenido principal */}
          <div style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)', padding: '20px', marginBottom: '20px', borderRadius: '7px', marginTop: '100px' }}>

=======
        <>
          {row.estado === 'terminado' ? null : (
            <button
              className="btn p-2 rounded-lg estado-button"
              style={{
                backgroundColor: row.estado === 'activo' ? 'orange' : row.estado === 'ejecutandose' ? '#2A5CB5' : row.estado === 'terminado' ? 'red' : 'green',
                border: 'none',
                color: 'white',
                height: '40px',
                width: '100px',
                marginLeft: '-18px',
                transition: 'background-color 0.2s',
              }}
              type="button"
              onClick={() => handleEstadoBotonClick(row.id_actividad, row.estado)}
              onMouseEnter={(e) => { e.target.style.backgroundColor = row.estado === 'activo' ? '#DC9E24' : row.estado === 'ejecutandose' ? '#377AF0' : row.estado === 'terminado' ? '#E54444' : '#2DBC28' }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = row.estado === 'activo' ? 'orange' : row.estado === 'ejecutandose' ? '#2A5CB5' : row.estado === 'terminado' ? 'red' : 'green' }}
            >
              {row.estado === 'activo' ? 'Ejecutar' : row.estado === 'ejecutandose' ? 'Terminar' : row.estado === 'terminado' ? 'Desactivar' : 'Activar'}
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
          <div style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)', padding: '20px', marginBottom: '20px', borderRadius: '7px', marginTop: '100px', position:'relative'}}>

>>>>>>> 7be821d016eefc676955a01b26496d46b92e3738
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
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 8px',
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
<<<<<<< HEAD

          <Datatable columns={columns} data={data} title="Actividades" />

=======
          {error ? (
            <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
          ) : (
            <Datatable columns={columns} data={data} title="Actividades" />
          )}
>>>>>>> 7be821d016eefc676955a01b26496d46b92e3738
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

export default Actividad;