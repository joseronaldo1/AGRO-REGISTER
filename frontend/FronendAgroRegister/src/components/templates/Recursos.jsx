import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa'; // Importa el icono de edición de FontAwesome
import Botones from '../atomos/BotonRegiApi';
import { Datatable } from '../moleculas/Datatable';
import ModalRecuRegeContrasenia from '../organismos/ModalRecur';
import Header from '../organismos/Header/Header';
import Footer from '../organismos/Footer/Footer';
import SearchBar from '../moleculas/SearchBar';
import '../../styles/FondoTable.css'; // Importa el archivo CSS para los estilos personalizados

function Recursos() {
  const baseURL = 'http://localhost:3000/listarRecurso';

  const [data, setData] = useState([]);
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [showActualizacionModal, setShowActualizacionModal] = useState(false);
  const [registroFormData, setRegistroFormData] = useState({});
  const [mode, setMode] = useState('create');
  const [initialData, setInitialData] = useState(null);
  const [originalData, setOriginalData] = useState([]);

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
    const updatedInitialData = { ...rowData, id: rowData.id_tipo_recursos };
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
      await axios.put(`http://localhost:3000/actualizarRecurso/${id}`, formData);
      fetchData(); // Actualizar los datos después de la actualización
      setShowActualizacionModal(false);
    } catch (error) {
      console.error('Error al actualizar el recurso:', error);
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      if (searchTerm.trim() === '') {
        // Si el término de búsqueda está vacío, restaurar los datos originales
        setData(originalData);
      } else {
        const response = await axios.get(`http://localhost:3000/buscarRecurso/${searchTerm}`);
        setData(response.data);
      }
    } catch (error) {
      console.error('Error searching for resources:', error);
    }
  };


  const handleEstadoBotonClick = async (id, estado) => {
    try {
      const newEstado = estado === 'existe' ? 'agotado' : 'existe';
      await axios.put(`http://localhost:3000/desactivar/Recurso/${id}`, { estado: newEstado });
      fetchData(); // Actualizar los datos después de la actualización
    } catch (error) {
      console.error('Error al cambiar el estado del recurso:', error);
    }
  };

  const columns = [
    /*   {
        name: 'ID',
        selector: (row) => row.id_tipo_recursos,
        sortable: true,
      }, */
    {
      name: 'Nombre',
      selector: (row) => row.nombre_recursos,
      sortable: true,
    },
    {
      name: 'Cantidad',
      selector: (row) => row.cantidad_medida,
      sortable: true,
    },
    {
      name: 'Unidades',
      selector: (row) => row.unidades_medida,
      sortable: true,
    },
    {
      name: 'Extras',
      selector: (row) => row.extras,
      sortable: true,
    },
    {
      name: 'Estado',
      cell: (row) => (
        <span style={{ color: row.estado === 'existe' ? 'green' : '#E83636', fontWeight: '700' }}>
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
            style={{ backgroundColor: '#975C29', borderColor: '#ffc107', border: 'none' }}
            type="button"
            onClick={() => handleOpenActualizacionModal(row)}
          >
            <FaEdit style={{ color: 'white' }} /> {/* Icono de edición */}
          </button>
          <button
            className="btn p-2 rounded-lg estado-button"
            style={{
              backgroundColor: row.estado === 'existe' ? '#E83636' : 'green',
              border: 'none',
              color: 'white',
              height: '40px',
              width: '600px',
              transition: 'background-color 0.2s', // Agregar una transición suave al color de fondo
            }}
            type="button"
            onClick={() => handleEstadoBotonClick(row.id_tipo_recursos, row.estado)}
            onMouseEnter={(e) => { e.target.style.backgroundColor = row.estado === 'existe' ? '#D33B3B' : '#2DBC28' }} // Cambiar el color de fondo al pasar el mouse
            onMouseLeave={(e) => { e.target.style.backgroundColor = row.estado === 'existe' ? 'red' : 'green' }} // Restaurar el color de fondo al dejar de pasar el mouse
          >
            {row.estado === 'existe' ? 'No hay' : 'Si hay'}
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
            <Datatable columns={columns} data={data} title="Recursos" />
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

export default Recursos;
