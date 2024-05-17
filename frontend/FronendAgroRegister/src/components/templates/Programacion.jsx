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

function Programacion() {
  const baseURL = 'http://localhost:3000/listarProgramacion';

  const [data, setData] = useState([]);
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [showActualizacionModal, setShowActualizacionModal] = useState(false);
  const [showEstadoModal, setShowEstadoModal] = useState(false);
  const [registroFormData, setRegistroFormData] = useState({});
  const [mode, setMode] = useState('create');
  const [initialData, setInitialData] = useState(null);
  const [originalData, setOriginalData] = useState([]);

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
    const updatedInitialData = { ...rowData, id: rowData.id_programacion };
    setInitialData(updatedInitialData);
    setShowEstadoModal(true);
  };

  const handleCloseEstadoModal = () => setShowEstadoModal(false);

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
      console.log('Actualización de Programación:', formData);
      const { id } = formData;
      await axios.put(`http://localhost:3000/actualizarProgramacion/${id}`, formData);
      fetchData();
      setShowActualizacionModal(false);
    } catch (error) {
      console.error('Error al actualizar la programación:', error);
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
      setError('Búsqueda no encontrada');
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
      name: 'Nombre Usuario',
      selector: (row) => row.usuario || row.nombre,
      sortable: true,
    },
    {
      name: 'Actividad',
      selector: (row) => row.nombre_actividad,
      sortable: true,
    },
    {
      name: 'Variedad',
      selector: (row) => row.nombre_variedad,
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
    <div>
      <div className="recursos-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div className="main-content" style={{ flex: 1 }}>

          <div style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)', padding: '20px', marginBottom: '20px', borderRadius: '7px', marginTop: '100px', position:'relative'}}>

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
          initialData={initialData} // Pasa el estado initialData aquí
          mode={mode}
        />
        <ModalEstadoProgramacion
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

export default Programacion;