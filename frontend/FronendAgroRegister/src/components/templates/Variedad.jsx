import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaRegEdit } from 'react-icons/fa';
import Botones from "../atomos/BotonRegiApi.jsx";
import { Datatable } from "../moleculas/Datatable";
import { FaPowerOff, FaLightbulb } from "react-icons/fa";
import ModalRecuRegeContrasenia from "../organismos/ModalVariedad.jsx";
import Header from "../organismos/Header/Header";
import Footer from '../organismos/Footer/Footer';
import SearchBar from '../moleculas/SearchBar';
import Swal from 'sweetalert2';

function Variedad() {
  const baseURL = 'http://localhost:3000/listarVariedades';

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
      setOriginalData(response.data); // Guardar los datos originales sin filtrar
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleOpenRegistroModal = () => setShowRegistroModal(true);
  const handleCloseRegistroModal = () => setShowRegistroModal(false);

  const handleOpenActualizacionModal = (rowData) => {
    const updatedInitialData = { ...rowData, id: rowData.id_variedad };
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
      await axios.put(`http://localhost:3000/actualizarVariedad/${id}`, formData);
      setShowActualizacionModal(false);
    } catch (error) {
      console.error('Error al actualizar la variedad:', error);
    }
  };


  // Función para buscar fincas por nombre_variedad
  const handleSearch = async (searchTerm) => {
    try {
      if (searchTerm.trim() === '') {
        // Si el término de búsqueda está vacío, restaurar los datos originales
        setData(originalData);

        setError(null); // Limpiar el error
      } else {
        const response = await axios.get(`http://localhost:3000/buscarVariedad/${searchTerm}`);
        setData(response.data);
        if (response.data.length === 0) {
          // Si no se encontraron resultados, establecer el mensaje de error
          setError('No se encontraron resultados');
        } else {
          setError(null); // Limpiar el error si se encontraron resultados
        }
      }
    } catch (error) {
      console.error('Error searching for resources:', error);
      setError('Busqueda no encontrada'); // Establecer mensaje de error
    }
  };


  const handleEstadoBotonClick = async (id, estado) => {
    try {

      const newEstado = estado === 'activo' ? 'inactivo' : 'activo';
      await axios.put(`http://localhost:3000/desactivar/Variedad/${id}`, { estado: newEstado });
      fetchData();


      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: `El estado se cambió con éxito a ${newEstado}.`,
      });

    } catch (error) {
      console.error('Error al cambiar el estado de la variedad:', error);
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
      name: 'Nombre Variedad',
      selector: (row) => row.nombre_variedad,
      sortable: true,
    },
    {
      name: 'Tipo Cultivo',
      selector: (row) => row.tipo_cultivo,
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%',
            marginLeft: '-16px',
            transition: 'background-color 0.2s',
          }}
          type="button"
          onClick={() => handleEstadoBotonClick(row.id_variedad, row.estado)}
          onMouseEnter={(e) => { e.target.style.backgroundColor = row.estado === 'activo' ? '#F54949' : '#2DBC28' }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = row.estado === 'activo' ? '#E83636' : 'green' }}
        >
          {row.estado === 'activo' ? <FaPowerOff style={{ marginRight: '5px' }} /> : <FaLightbulb style={{ marginRight: '3px' }} />}
          {row.estado === 'activo' ? 'Desactivar' : 'Activar'}
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
                width: '100px',
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
            <Datatable columns={columns} data={data} title="Variedades de cultivos" />
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

export default Variedad;