import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Botones from '../components/atomos/Botones';
import { Datatable } from '../components/moleculas/Datatable';
import ModalRecuRegeContrasenia from '../components/organismos/ModalRecur';
import Header from '../components/organismos/Header/Header';
import Formulario from '../components/organismos/FormRecursos';

function Recursos() {
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [showActualizacionModal, setShowActualizacionModal] = useState(false);
  const [data, setData] = useState([]);
  const [registroFormData, setRegistroFormData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/RegistroRecurso');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleOpenRegistroModal = () => setShowRegistroModal(true);
  const handleCloseRegistroModal = () => setShowRegistroModal(false);
  const handleOpenActualizacionModal = () => {
    if (!showActualizacionModal) {
      setShowActualizacionModal(true);
    } else {
      setShowActualizacionModal(false);
    }
  };
  const handleCloseActualizacionModal = () => setShowActualizacionModal(false);

  const handleActualizacionFormSubmit = async (formData) => {
    try {
      console.log('Actualización de recurso:', formData);
      // Lógica para enviar la solicitud de actualización al servidor
      fetchData();
      setShowActualizacionModal(false);
    } catch (error) {
      console.error('Error al actualizar el recurso:', error);
    }
  };

  const columns = [
    { name: 'ID', selector: 'id', sortable: true },
    { name: 'Nombre', selector: 'nombre_recursos', sortable: true },
    { name: 'Cantidad', selector: 'cantidad_medida', sortable: true },
    { name: 'Unidades', selector: 'unidades_medida', sortable: true },
    { name: 'Extras', selector: 'extras', sortable: true },
    {
      name: 'Acciones',
      cell: (row) => (
        <button
          className="btn btn-warning p-2 rounded-lg text-sm font-bold"
          type="button"
          onClick={handleOpenActualizacionModal}
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
        initialData={{}}
        mode="actualizacion"
      />
    </div>
  );
}

export default Recursos;
