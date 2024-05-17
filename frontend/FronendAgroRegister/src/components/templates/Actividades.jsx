import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaRegEdit } from 'react-icons/fa';
import { RiPlantFill } from "react-icons/ri";
import Botones from "../atomos/BotonRegiApi.jsx";
import { Datatable } from "../moleculas/Datatable";
import ModalRecuRegeContrasenia from "../organismos/ModalActividad.jsx";
import ModalEstadoActividad from "../organismos/ModalEstadoActividad.jsx";
import Header from "../organismos/Header/Header";
import Footer from '../organismos/Footer/Footer';
import SearchBar from '../moleculas/SearchBar';
import Swal from 'sweetalert2';

function Actividad() {
  const baseURL = 'http://localhost:3000/listarActividad';

  const [data, setData] = useState([]);
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [showActualizacionModal, setShowActualizacionModal] = useState(false);
  const [showEstadoModal, setShowEstadoModal] = useState(false); // Estado para controlar la visibilidad del modal de estado
  const [registroFormData, setRegistroFormData] = useState({});
  const [mode, setMode] = useState('create');
  const [originalData, setOriginalData] = useState([]);
  const [initialData, setInitialData] = useState(null);
  const [error, setError] = useState(null);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('');


  useEffect(() => {
    fetchData();
  }, [data]);

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

  const handleOpenEstadoModal = (rowData) => {
    const updatedInitialData = { ...rowData, id: rowData.id_actividad };
    setInitialData(updatedInitialData);
    setShowEstadoModal(true);
  };

  const handleCloseEstadoModal = () => setShowEstadoModal(false);

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

  const handleEstadoBotonClick = async (id, estado) => {
    try {
      let newEstado;
      switch (estado) {
        case 'activo':
          newEstado = 'ejecutandose';
          break;

        case 'inactivo':
          newEstado = 'activo';
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
      await axios.put(`http://localhost:3000/Desactivara/actividad/${id}`, { estado: newEstado });

      fetchData();
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

  const handleEstadoSubmit = async (formData) => {
    try {
      console.log('Manejando envío de formulario de estado:', formData);

      /*   // Por ejemplo, podrías enviar una solicitud PUT con Axios
        await axios.put('http://localhost:3000/Desactivara/actividad/${id}', formData); */

      fetchData();
      setShowEstadoModal(false);
    } catch (error) {
      console.error('Error al enviar el formulario de estado:', error);
    }
  };


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

        <>
          <button
            className="btn p-2 rounded-lg"
            style={{ backgroundColor: '#466AD6', borderColor: '#ffc107', color: 'white', border: 'none', marginLeft: '-55px', width: '400px' }}
            type="button"
            onClick={() => handleOpenEstadoModal(row)} // Cambia la función para abrir el modal de actualización por la función para abrir el modal de estado
          >
            <RiPlantFill style={{ color: 'white' }} />Estado
          </button>
        </>
      ),
    },
  ];

  return (
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


          <br />

          {error ? (
            <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
          ) : (
            <Datatable columns={columns} data={data} title="Actividades" />
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
        <ModalEstadoActividad
          mostrar={showEstadoModal}
          cerrarModal={handleCloseEstadoModal}
          initialData={initialData}
          titulo="Estados"
          actionLabel="Guardar"
          handleSubmit={handleEstadoSubmit} // Asegúrate de pasar la función handleSubmit
        />
        <br />
      </div>
      <Footer />
    </div>
  );
}

export default Actividad;
