import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Botones from '../components/atomos/Botones';
import { Datatable } from '../components/moleculas/Datatable';
import ModalRecuRegeContrasenia from '../components/organismos/ModalRecur';
import Header from '../components/organismos/Header/Header';
import Formulario from '../components/organismos/Formulario';

function Recursos() {
  const baseURL = 'http://localhost:3000/listarRecurso';

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
    // Asegurarse de que initialData contenga el campo id_tipo_recursos
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
      // Obtener el ID del recurso
      const { id } = formData;
      // Realizar la solicitud PUT para actualizar los datos
      await axios.put(`http://localhost:3000/actualizarRecurso/${id}`, formData);
      // Actualizar los datos en la interfaz
      fetchData();
      // Cerrar el modal de actualización
      setShowActualizacionModal(false);
    } catch (error) {
      console.error('Error al actualizar el recurso:', error);
    }
  };

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id_tipo_recursos,
      sortable: true,
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
      name: 'Acciones',
      cell: (row) => (
        <button
          className="btn btn-warning p-2 rounded-lg text-sm font-bold" style={{ marginLeft: '-8px' }}
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
        <Botones children="Registrar" onClick={handleOpenRegistroModal} />
        <Datatable columns={columns} data={data} title="Recursos" />
      </div>

      <ModalRecuRegeContrasenia
        mostrar={showRegistroModal}
        cerrarModal={handleCloseRegistroModal}
        titulo="Registro"
        actionLabel="Registrar"
        initialData={registroFormData}
        mode="registro"
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

export default Recursos;
