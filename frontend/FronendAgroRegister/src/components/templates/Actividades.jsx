import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Botones from '../atomos/BotonRegiApi';
import { Datatable } from '../moleculas/Datatable';
import ModalRecuRegeContrasenia from '../organismos/ModalActividad';
import Header from '../organismos/Header/Header';
import SearchBar from '../moleculas/SearchBar'; // Importamos el componente de búsqueda

function Actividad() {
  const baseURL = "http://localhost:3000/listara";

  const [data, setData] = useState([]);
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [showActualizacionModal, setShowActualizacionModal] = useState(false);
  const [registroFormData, setRegistroFormData] = useState({});
  const [mode, setMode] = useState("create");
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(baseURL);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpenRegistroModal = () => setShowRegistroModal(true);
  const handleCloseRegistroModal = () => setShowRegistroModal(false);

  const handleOpenActualizacionModal = (rowData) => {
    const updatedInitialData = { ...rowData, id: rowData.id_actividad };
    setInitialData(updatedInitialData);
    setMode("update");
    setShowActualizacionModal(true);
  };

  const handleCloseActualizacionModal = () => {
    setInitialData(null);
    setShowActualizacionModal(false);
  };

  const handleActualizacionFormSubmit = async (formData) => {
    try {
      console.log("Actualización de recurso:", formData);
      const { id } = formData;
      await axios.put(`http://localhost:3000/Actualizara/actividad/${id}`,formData);
      fetchData();
      setShowActualizacionModal(false);
    } catch (error) {
      console.error("Error al actualizar el recurso:", error);
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get( `http://localhost:3000/Buscar/actividad/${searchTerm}`);
      setData(response.data);
    } catch (error) {
      console.error("Error searching for resources:", error);
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id_actividad,
      sortable: true,
    },
    {
      name: "Nombre Actividad",
      selector: (row) => row.nombre_actividad,
      sortable: true,
    },
    {
      name: "Tiempo",
      selector: (row) => row.tiempo,
      sortable: true,
    },
    {
      name: "Observaciones",
      selector: (row) => row.observaciones,
      sortable: true,
    },
    {
      name: "Valor Actividad",
      selector: (row) => row.valor_actividad,
      sortable: true,
    },
    {
      name: "fk_variedad",
      selector: (row) => row.id_variedad,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.estado,
      sortable: true,
    },
    
    {
      name: "Acciones",
      cell: (row) => (
        <button
          className="btn btn-warning p-2 rounded-lg text-sm font-bold"
          style={{ width: '100px' }}
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
        <Datatable columns={columns} data={data} title="Actividades" />
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

export default Actividad;