import React, { useState, useEffect } from "react";
import axios from 'axios';
import Botones from "../components/atomos/BotonRegiApi.jsx";
import { Datatable } from "../components/moleculas/Datatable";
import ModalRecuRegeContrasenia from "../components/organismos/ModalVariedad.jsx";
import Header from "../components/organismos/Header/Header";
import SearchBar from '../components/moleculas/SearchBar';

function Variedad() {
  const baseURL = 'http://localhost:3000/listarVariedades';

  const [data, setData] = useState([]);
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [showActualizacionModal, setShowActualizacionModal] = useState(false);
  const [registroFormData, setRegistroFormData] = useState({});
  const [mode, setMode] = useState('create');
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

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
      fetchData();
      setShowActualizacionModal(false);
    } catch (error) {
      console.error('Error al actualizar la variedad:', error);
    }
  };

// Función para buscar recursos por ID
const handleSearch = async (searchTerm) => {
  try {
    const response = await axios.get(`http://localhost:3000/buscarVariedad/${searchTerm}`);
    setData(response.data);
  } catch (error) {
    console.error('Error searching for resources:', error);
  }
};

const columns = [
  {
    name: 'ID',
    selector: (row) => row.id_variedad,
    sortable: true,
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
    name: 'Acciones',
    cell: (row) => (
      <button
        className="btn btn-warning p-2 rounded-lg text-sm font-bold"
        style={{ marginLeft: '-10px' }}
        type="button"
        onClick={() => handleOpenActualizacionModal(row)}
      >
        Editar
      </button>
    ),
  },
];

return (
  <div style={{ marginTop: '8%' }}>
    <Header />
    <div className="container mt-5">
      <SearchBar onSearch={handleSearch} /> {/* Componente de búsqueda */}
      <Botones children="Registrar" onClick={handleOpenRegistroModal}  />
      <Datatable columns={columns} data={data} title="Variedad" />
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
    </div>
  );
}

    

  
export default Variedad;
