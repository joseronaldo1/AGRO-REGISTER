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
  const [originalData, setOriginalData] = useState([]);
  const [error, setError] = useState(null); // Estado para manejar errores
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
      if (searchTerm.trim() === '') {
        // Si el término de búsqueda está vacío, restaurar los datos originales
        setData(originalData);
        setError(null); // Limpiar el error
      } else {
        const response = await axios.get(`http://localhost:3000/buscarCultivo/${searchTerm}`);
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
      const newEstado = estado === 'activo' ? 'inactivo' : 'activo'; //Cambiar los estados existentes por "activo" e "inactivo"
      await axios.put(`http://localhost:3000/desactivar/Cultivo/${id}`, { estado: newEstado });
      fetchData(); // Actualizar los datos después de la actualización
    } catch (error) {
      console.error('Error al cambiar el estado de la finca:', error);
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
    // {
    //   name: 'ID',
    //   selector: (row) => row.id_cultivo,
    //   sortable: true,
    // },
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
      name: 'Nombre Variedad',
      selector: (row) => row.nombre_variedad,
      sortable: true,
    },
    {
      name: 'Nombre Lote',
      selector: (row) => row.nombre_lote,
      sortable: true,
    },
    {
      name: 'Cantidad Sembrada',
      selector: (row) => row.cantidad_sembrada,
      sortable: true,
    },
    {
      name: 'Fecha Inicio',
      selector: (row) => row.fecha_inicio,
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
            width: '120px',
            marginLeft: '-18px',
            transition: 'background-color 0.2s', // Agregar una transición suave al color de fondo
          }}
          type="button"
          onClick={() => handleEstadoBotonClick(row.id_cultivo, row.estado)}
          onMouseEnter={(e) => { e.target.style.backgroundColor = row.estado === 'activo' ? '#D33B3B' : '#2DBC28' }} // Cambiar el color de fondo al pasar el mouse
          onMouseLeave={(e) => { e.target.style.backgroundColor = row.estado === 'activo' ? 'red' : 'green' }} // Restaurar el color de fondo al dejar de pasar el mouse
        >
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
          <div style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)', padding: '20px', marginBottom: '20px', borderRadius: '7px', marginTop: '100px', position:'relative'}}>

            <SearchBar onSearch={handleSearch} />
            <Botones children="Registrar" onClick={handleOpenRegistroModal} />
            {/* Select para seleccionar el estado */}
            <select 
  style={{ 
    position: 'absolute',
    marginTop: '-36px',
    marginLeft: '520px',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    background: 'linear-gradient(to bottom, #ffffff 0%, #f9f9f9 100%)',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 8px',
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
            <Datatable columns={columns} data={data} title="Cultivos" />
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

export default Cultivos;
