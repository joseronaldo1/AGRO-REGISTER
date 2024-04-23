import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Botones from '../atomos/BotonRegiApi';
import { FaEdit } from 'react-icons/fa';
import { Datatable } from '../moleculas/Datatable';
import ModalRecuRegeContrasenia from '../organismos/ModalActividad';
import Header from '../organismos/Header/Header';
import Footer from '../organismos/Footer/Footer';
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
          className="btn p-2 rounded-lg"
          style={{ backgroundColor: '#ffc107', borderColor: '#ffc107', marginLeft: '18px' }}
          type="button"
          onClick={() => handleOpenActualizacionModal(row)}
        >
          <FaEdit style={{ color: '#343a40' }} /> {/* Icono de edición */}
        </button>
      ),
    },
  ];

  return (
    <div className="recursos-container">
      <Header />
      <div className="container mt-5">
        <div style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)', padding: '20px', marginBottom: '20px', borderRadius: '7px', marginTop: '100px' }}>
          <div className="white-container">
            <SearchBar onSearch={handleSearch} />
            <Botones children="Registrar" onClick={handleOpenRegistroModal} />
          </div>
        </div>
        <br />
        <div style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)', padding: '20px', borderRadius: '2px' }}>
          <Datatable columns={columns} data={data} title="Actividades" />
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
      <Footer/>
    </div> 
  );
  
  
}

export default Actividad;