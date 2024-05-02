import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaEdit } from 'react-icons/fa'; // Importa el icono de edición de FontAwesome
import Botones from "../atomos/BotonRegiApi.jsx";
import { Datatable } from "../moleculas/Datatable";
import ModalRecuRegeContrasenia from "../organismos/ModalCultivos.jsx";
import Header from "../organismos/Header/Header";
import Footer from '../organismos/Footer/Footer';
import SearchBar from '../moleculas/SearchBar';

function Cultivos() {
  const baseURL = 'http://localhost:3000/listarCultivos';

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
    const updatedInitialData = { ...rowData, id: rowData.id_cultivo };
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
      console.log('Actualización del cultivo:', formData);
      const { id } = formData;
      await axios.put(`http://localhost:3000/actualizarCultivo/${id}`, formData);
      fetchData();
      setShowActualizacionModal(false);
    } catch (error) {
      console.error('Error al actualizar el cultivo:', error);
    }
  };

  // Función para buscar fincas por nombre_variedad
  const handleSearch = async (searchTerm) => {
    try {
        const response = await axios.get(`http://localhost:3000/buscarCultivo/${searchTerm}`); // Cambio aquí: enviar el nombre de la variedad como término de búsqueda
        setData(response.data);
    } catch (error) {
        console.error('Error searching for resources:', error);
    }
};

const handleEstadoBotonClick = async (id, estado) => {
  try {
    const newEstado = estado === 'activo' ? 'inactivo' : 'activo'; //Cambiar los estados existentes por "activo" e "inactivo"
    await axios.put(`http://localhost:3000/desactivar/Cultivo/${id}`, { estado: newEstado });
    fetchData(); // Actualizar los datos después de la actualización
  } catch (error) {
    console.error('Error al cambiar el estado de la finca:', error);
  }
};

  const columns = [
    // {
    //   name: 'ID',
    //   selector: (row) => row.id_cultivo,
    //   sortable: true,
    // },
    {
      name: 'Fecha Inicio',
      selector: (row) => row.fecha_inicio,
      sortable: true,
    },
    {
      name: 'Cantidad Sembrada',
      selector: (row) => row.cantidad_sembrada,
      sortable: true,
    },
    {
      name: 'Nombre Lote',
      selector: (row) => row.nombre_lote,
      sortable: true,
    },
    {
      name: 'Nombre Variedad',
      selector: (row) => row.nombre_variedad,
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
              backgroundColor: row.estado === 'activo' ? 'red' : 'green',
              border: 'none',
              color: 'white',
              height: '40px',
              width: '550px',
              transition: 'background-color 0.2s', // Agregar una transición suave al color de fondo
            }}
            type="button"
            onClick={() => handleEstadoBotonClick(row.id_cultivo, row.estado)}
            onMouseEnter={(e) => { e.target.style.backgroundColor = row.estado === 'activo' ? '#D33B3B' : '#2DBC28' }} // Cambiar el color de fondo al pasar el mouse
            onMouseLeave={(e) => { e.target.style.backgroundColor = row.estado === 'activo' ? 'red' : 'green' }} // Restaurar el color de fondo al dejar de pasar el mouse
          >
            {row.estado === 'activo' ? 'Inactivo' : 'Activo'}
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
            <Datatable columns={columns} data={data} title="Cultivos" />
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

export default Cultivos;

