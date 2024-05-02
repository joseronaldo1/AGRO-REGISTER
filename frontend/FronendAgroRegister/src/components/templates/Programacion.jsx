import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaEdit } from 'react-icons/fa'; // Importa el icono de edición de FontAwesome
import Botones from "../atomos/BotonRegiApi.jsx";
import { Datatable } from "../moleculas/Datatable";
import ModalRecuRegeContrasenia from "../organismos/ModalProgramacion.jsx";
import Header from "../organismos/Header/Header";
import Footer from '../organismos/Footer/Footer';
import SearchBar from '../moleculas/SearchBar';


function Programacion() {
  const baseURL = 'http://localhost:3000/listarProgramacion';

  const [data, setData] = useState([]);
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [showActualizacionModal, setShowActualizacionModal] = useState(false);
  const [registroFormData, setRegistroFormData] = useState({});
  const [mode, setMode] = useState('create');
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await axios.get(baseURL);
      setData(response.data);
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

  // Función para buscar fincas por nombre_finca
  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(`http://localhost:3000/buscarProgramacion/${searchTerm}`);
      setData(response.data);
    } catch (error) {
      console.error('Error searching for resources:', error);
    }
  };

  const handleEstadoBotonClick = async (id, estado) => {
    try {
      let newEstado;
      switch (estado) {
        case 'activo':
          newEstado = 'ejecutandose';
          break;
        case 'ejecutandose':
          newEstado = 'terminado';
          break;
        case 'terminado':
          newEstado = 'inactivo';
          break;
        case 'inactivo':
          newEstado = 'activo';
          break;
        default:
          break;
      }
      await axios.put(`http://localhost:3000/desactivar/Programacion/${id}`, { estado: newEstado });
      fetchData(); // Actualizar los datos después de la actualización
    } catch (error) {
      console.error('Error al cambiar el estado de la actividad:', error);
    }
  };

  const columns = [
    /*{
      name: 'ID',
      selector: (row) => row.id_programacion,
      sortable: true,
    },*/
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
      name: 'Nombre Usuario',
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: 'Nombre Actividad',
      selector: (row) => row.nombre_actividad,
      sortable: true,
    },
    {
      name: 'ID Cultivo',
      selector: (row) => row.id_cultivo,
      sortable: true,
    },
    {
      name: 'Estado',
      selector: (row) => row.estado,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <>
          <button
            className="btn p-2 rounded-lg"
            style={{ backgroundColor: '#975C29', borderColor: '#ffc107', border: 'none' }}
            type="button"
            onClick={() => handleOpenActualizacionModal(row)}
          >
            <FaEdit style={{ color: 'white' }} /> {/* Icono de edición */}
          </button>
          <button
          className="btn p-2 rounded-lg estado-button"
          style={{
            backgroundColor: row.estado === 'activo' ? 'orange' : row.estado === 'ejecutandose' ? '#2A5CB5' : row.estado === 'terminado' ? 'red' : 'green',
            border: 'none',
            color: 'white',
            height: '40px',
            width: '1040px',
            transition: 'background-color 0.2s', // Agregar una transición suave al color de fondo
          }}
          type="button"
          onClick={() => handleEstadoBotonClick(row.id_programacion, row.estado)}
          onMouseEnter={(e) => { e.target.style.backgroundColor = row.estado === 'activo' ? '#DC9E24' : row.estado === 'ejecutandose' ? '#377AF0' : row.estado === 'terminado' ? '#E54444' : '#2DBC28' }} // Cambiar el color de fondo al pasar el mouse
          onMouseLeave={(e) => { e.target.style.backgroundColor = row.estado === 'activo' ? 'orange' : row.estado === 'ejecutandose' ? '#2A5CB5' : row.estado === 'terminado' ? 'red' : 'green' }} // Restaurar el color de fondo al dejar de pasar el mouse
        >
          {row.estado === 'activo' ? 'Ejecutar' : row.estado === 'ejecutandose' ? 'Terminar' : row.estado === 'terminado' ? 'Desactivar' : 'Activar'}
        </button>
        </>
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
            <div className="white-container">
              <SearchBar onSearch={handleSearch} />
              <Botones children="Registrar" onClick={handleOpenRegistroModal} />
            </div>
          </div>
          <br />
          <div style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)', padding: '20px', borderRadius: '2px' }}>
            <Datatable columns={columns} data={data} title="Programacion" />
          </div>
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

