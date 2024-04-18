import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Botones from '../atomos/BotonRegiApi';
import { FaEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai'; // Importar el ícono de eliminar
import { Datatable } from '../moleculas/Datatable';
import ModalRecuRegeContrasenia from '../organismos/ModalActividad';
import Header from '../organismos/Header/Header';
import SearchBar from '../moleculas/SearchBar'; // Importar el componente de búsqueda

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
      await axios.put(`http://localhost:3000/Actualizara/actividad/${id}`, formData);
      fetchData();
      setShowActualizacionModal(false);
    } catch (error) {
      console.error("Error al actualizar el recurso:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.put(`http://localhost:3000/Desactivara/actividad/${id}`, { estado: 'inactivo' });
      fetchData();
    } catch (error) {
      console.error("Error al desactivar la actividad:", error);
    }
  };
  

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(`http://localhost:3000/Buscar/actividad/${searchTerm}`);
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
        <div style={{marginLeft: '13px'}}>
          <button
            className="btn p-2 rounded-lg mr-2"
            style={{ backgroundColor: '#ffc107', borderColor: '#ffc107' }}
            type="button"
            onClick={() => handleOpenActualizacionModal(row)}
          >
            <FaEdit style={{ color: '#343a40' }} /> {/* Icono de edición */}
          </button>
          <button
  className="btn p-2 rounded-lg"
  style={{ backgroundColor: '#dc3545', borderColor: '#dc3545', marginLeft:'10px'}}
  type="button"
  onClick={() => handleDelete(row.id_actividad)} // Aquí pasamos el ID de la actividad
>
  <AiOutlineDelete style={{ color: '#fff' }} /> {/* Icono de eliminar */}
</button>

        </div>
      ),
    },
  ];

  return (
    <div className="recursos-container">
      <Header />
      <div className="container mt-5">
        <div className="white-container">
          <SearchBar onSearch={handleSearch} />
          <Botones children="Registrar" onClick={handleOpenRegistroModal} />
        </div>
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
