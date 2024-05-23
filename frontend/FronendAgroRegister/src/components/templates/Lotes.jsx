import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaRegEdit } from 'react-icons/fa';
import Botones from "../atomos/BotonRegiApi.jsx";
import { Datatable } from "../moleculas/Datatable";
import ModalRecuRegeContrasenia from "../organismos/ModalLotes.jsx";
import Header from "../organismos/Header/Header";
import { FaPowerOff, FaLightbulb } from "react-icons/fa";
import Footer from '../organismos/Footer/Footer';
import Swal from 'sweetalert2';
import SearchBar from '../moleculas/SearchBar';

function Lotes() {
  const baseURL = 'http://localhost:3000/listarlote';

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
      setError('Error al obtener datos');
    }
  };

  const handleOpenRegistroModal = () => setShowRegistroModal(true);
  const handleCloseRegistroModal = () => setShowRegistroModal(false);

  const handleOpenActualizacionModal = (rowData) => {
    const updatedInitialData = { ...rowData, id: rowData.id_lote };
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
      await axios.put(`http://localhost:3000/Actualizarlote/${id}`, formData);
      fetchData();
      setShowActualizacionModal(false);
    } catch (error) {
      console.error('Error al actualizar el lote:', error);
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      if (searchTerm.trim() === '') {
        setData(originalData);
        setError(null);
      } else {
        const response = await axios.get(`http://localhost:3000/Buscarlote/${searchTerm}`);
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

  const handleEstadoBotonClick = async (id, estado) => {
    try {
      const newEstado = estado === 'activo' ? 'inactivo' : 'activo';
      await axios.put(`http://localhost:3000/desactivar/Lote/${id}`, { estado: newEstado });
      fetchData();
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: `El estado se cambió con éxito a ${newEstado}.`,
      });
    } catch (error) {
      console.error('Error al cambiar el estado del lote:', error);
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
          style={{ backgroundColor: '#B5B5B5', borderColor: '#ffc107', marginLeft: '10px', border: 'none' }}
          type="button"
          onClick={() => handleOpenActualizacionModal(row)}
        >
          <FaRegEdit style={{ color: 'black' }} />
        </button>
      ),
    },
    {
      name: 'Nombre',
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: 'Longitud',
      selector: (row) => row.longitud,
      sortable: true,
    },
    {
      name: 'Latitud',
      selector: (row) => row.latitud,
      sortable: true,
    },
    {
      name: 'Nombre finca',
      selector: (row) => row.nombre_finca,
      sortable: true,
    },
    {
      name: 'Estado',
      cell: (row) => (
        <span style={{ color: row.estado === 'activo' ? 'green' : '#E83636', fontWeight: '700' }}>
          {row.estado}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <button
          className="btn p-2 rounded-lg estado-button"
          style={{
            backgroundColor: row.estado === 'activo' ? '#E83636' : 'green',
            border: 'none',
            color: 'white',
            height: '40px',
            marginLeft: '-18px',
            width: '100px',
            transition: 'background-color 0.2s',
          }}
          type="button"
          onClick={() => handleEstadoBotonClick(row.id_lote, row.estado)}
          onMouseEnter={(e) => { e.target.style.backgroundColor = row.estado === 'activo' ? '#D33B3B' : '#2DBC28' }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = row.estado === 'activo' ? 'red' : 'green' }}
        >
          {row.estado === 'activo' ? <FaPowerOff style={{ marginRight: '5px' }} /> : <FaLightbulb style={{ marginRight: '3px' }} />}
          {row.estado === 'activo' ? 'Inactivo' : 'Activo'}
        </button>

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
                marginLeft: '920px',
                padding: '8px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                background: 'linear-gradient(to bottom, #ffffff 0%, #f9f9f9 100%)',
                boxShadow: 'rgba(0, 0, 0, 6.1) 0px 0px 8px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                width: '100px',  // Ajusta el ancho según tus necesidades
              }}
              value={estadoSeleccionado}
              onChange={handleEstadoSeleccionado}
            >
              <option value="">Estados</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>





          </div>

          <br />


          {error ? (
            <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
          ) : (
            <Datatable columns={columns} data={data} title="Sector cultivos" />
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

export default Lotes;
