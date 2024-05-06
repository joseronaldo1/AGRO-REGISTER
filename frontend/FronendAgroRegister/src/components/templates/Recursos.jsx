import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import Botones from '../atomos/BotonRegiApi';
import { Datatable } from '../moleculas/Datatable';
import ModalRecuRegeContrasenia from '../organismos/ModalRecur';
import Header from '../organismos/Header/Header';
import Footer from '../organismos/Footer/Footer';
import SearchBar from '../moleculas/SearchBar';
import '../../styles/FondoTable.css';

function Recursos() {
  const baseURL = 'http://localhost:3000/listarRecurso';

  const [data, setData] = useState([]);
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [showActualizacionModal, setShowActualizacionModal] = useState(false);
  const [registroFormData, setRegistroFormData] = useState({});
  const [mode, setMode] = useState('create');
  const [initialData, setInitialData] = useState(null);
  const [originalData, setOriginalData] = useState([]);
<<<<<<< HEAD
=======
  const [error, setError] = useState(null);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
>>>>>>> 7be821d016eefc676955a01b26496d46b92e3738

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(baseURL);
      setData(response.data);
<<<<<<< HEAD
      setOriginalData(response.data); // Guardar los datos originales sin filtrar
=======
      setOriginalData(response.data);
>>>>>>> 7be821d016eefc676955a01b26496d46b92e3738
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
      fetchData();
      setShowActualizacionModal(false);
    } catch (error) {
      console.error('Error al actualizar el recurso:', error);
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      if (searchTerm.trim() === '') {
<<<<<<< HEAD
        // Si el término de búsqueda está vacío, restaurar los datos originales
        setData(originalData);
      } else {
        const response = await axios.get(`http://localhost:3000/buscarRecurso/${searchTerm}`);
        setData(response.data);
=======
        setData(originalData);
        setError(null);
      } else {
        const response = await axios.get(`http://localhost:3000/buscarRecurso/${searchTerm}`);
        setData(response.data);
        if (response.data.length === 0) {
          setError('No se encontraron resultados');
        } else {
          setError(null);
        }
>>>>>>> 7be821d016eefc676955a01b26496d46b92e3738
      }
    } catch (error) {
      console.error('Error searching for resources:', error);
      setError('Busqueda no encontrada');
    }
  };

<<<<<<< HEAD

=======
>>>>>>> 7be821d016eefc676955a01b26496d46b92e3738
  const handleEstadoBotonClick = async (id, estado) => {
    try {
      const newEstado = estado === 'existe' ? 'agotado' : 'existe';
      await axios.put(`http://localhost:3000/desactivar/Recurso/${id}`, { estado: newEstado });
      fetchData();
    } catch (error) {
      console.error('Error al cambiar el estado del recurso:', error);
    }
  };

<<<<<<< HEAD
  const columns = [
    /*   {
        name: 'ID',
        selector: (row) => row.id_tipo_recursos,
        sortable: true,
      }, */
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

  const columns = [
>>>>>>> 7be821d016eefc676955a01b26496d46b92e3738
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
<<<<<<< HEAD

=======
>>>>>>> 7be821d016eefc676955a01b26496d46b92e3738
        <button
          className="btn p-2 rounded-lg estado-button"
          style={{
            backgroundColor: row.estado === 'existe' ? '#E83636' : 'green',
            border: 'none',
            color: 'white',
            height: '40px',
            marginLeft: '-18px',
            width: '100px',
<<<<<<< HEAD
            transition: 'background-color 0.2s', // Agregar una transición suave al color de fondo
          }}
          type="button"
          onClick={() => handleEstadoBotonClick(row.id_tipo_recursos, row.estado)}
          onMouseEnter={(e) => { e.target.style.backgroundColor = row.estado === 'existe' ? '#D33B3B' : '#2DBC28' }} // Cambiar el color de fondo al pasar el mouse
          onMouseLeave={(e) => { e.target.style.backgroundColor = row.estado === 'existe' ? 'red' : 'green' }} // Restaurar el color de fondo al dejar de pasar el mouse
        >
          {row.estado === 'existe' ? 'No hay' : 'Si hay'}
        </button>

=======
            transition: 'background-color 0.2s',
          }}
          type="button"
          onClick={() => handleEstadoBotonClick(row.id_tipo_recursos, row.estado)}
          onMouseEnter={(e) => { e.target.style.backgroundColor = row.estado === 'existe' ? '#D33B3B' : '#2DBC28' }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = row.estado === 'existe' ? 'red' : 'green' }}
        >
          {row.estado === 'existe' ? 'No hay' : 'Si hay'}
        </button>
>>>>>>> 7be821d016eefc676955a01b26496d46b92e3738
      ),
    },
  ];

  return (
    <div>
      <div className="recursos-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div className="main-content" style={{ flex: 1 }}>
          <div style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)', padding: '20px', marginBottom: '20px', borderRadius: '7px', marginTop: '100px' }}>

            <SearchBar onSearch={handleSearch} />
            <Botones children="Registrar" onClick={handleOpenRegistroModal} />
<<<<<<< HEAD
          </div>

          <br />

          <Datatable columns={columns} data={data} title="Recursos" />

=======
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
                width: '100px',
              }}
              value={estadoSeleccionado}
              onChange={handleEstadoSeleccionado}
            >
              <option value="">Estado</option>
              <option value="agotado">Agotado</option>
              <option value="existe">Existe</option>
            </select>
          </div>

          <br />
          {error ? (
            <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
          ) : (
            <Datatable columns={columns} data={data} title="Recursos" />
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

export default Recursos;