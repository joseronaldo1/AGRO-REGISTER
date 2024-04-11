import React, { useState } from "react";
import Botones from "../components/atomos/Botones";
import { Datatable } from "../components/moleculas/Datatable";
import ModalRecuRegeContrasenia from "../components/organismos/Modal";
import Header from "../components/organismos/Header/Header";
import Formulario from '../components/organismos/Formulario.jsx';

function Variedad() {
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [showActualizacionModal, setShowActualizacionModal] = useState(false);
  const [registroFormData, setRegistroFormData] = useState({
    nombreVariedad: "",
    tipo: "",
    estado: "",
  });
  const [actualizacionFormData, setActualizacionFormData] = useState({
    nombreVariedad: "",
    tipo: "",
    estado: "",
  });

  const handleOpenRegistroModal = () => {
    setShowRegistroModal(true);
  };

  const handleCloseRegistroModal = () => {
    setShowRegistroModal(false);
  };

  const handleOpenActualizacionModal = () => {
    setShowActualizacionModal(true);
  };

  const handleCloseActualizacionModal = () => {
    setShowActualizacionModal(false);
  };

  const handleRegistroFormSubmit = (event) => {
    event.preventDefault();
    console.log("Datos de registro:", registroFormData);
    setRegistroFormData({
      nombreVariedad: "",
    tipo: "",
    estado: "",
    });
    handleCloseRegistroModal();
  };

  const handleActualizacionFormSubmit = (event) => {
    event.preventDefault();
    console.log("Datos de actualización:", actualizacionFormData);
    setActualizacionFormData({
      nombreVariedad: "",
    tipo: "",
    estado: "",
    });
    handleCloseActualizacionModal();
  };

  const camposRegistro = [
    { name: "nombreVariedad", placeholder: "Nombre de la Variedad", type: "text" },
    { name: "tipo", placeholder: "Tipo de Variedad", type: "text" },
    { name: "estado", placeholder: "Estado", type: "text" },
  ];

  const camposActualizacion = [
    { name: "nombreVariedad", placeholder: "Nombre de la Variedad", type: "text" },
    { name: "tipo", placeholder: "Tipo de Variedad", type: "text" },
    { name: "estado", placeholder: "Estado", type: "text" },
  ];

  const columns = [
    {
      name: "Nombre de la Variedad",
      selector: (row) => row.nombreVariedad,
      sortable: true,
    },
    {
      name: "Tipo de Variedad",
      selector: (row) => row.tipo,
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
          type="button"
          onClick={() => handleOpenActualizacionModal()}
        >
          Editar
        </button>
      ),
    },
  ];

  const data = [
    {
      nombreVariedad: "cebolla",
      tipo: "organico",
      estado: "activo",
    }
  ];

  return (
    <div style={{ marginTop: "8%" }}>
      <Header />
      <div className="container mt-5">
        <Botones
          children="Registrar"
          onClick={() => handleOpenRegistroModal()}
        />
        <Datatable columns={columns} data={data} title="Variedad" />
      </div>

      {/* Modal de Registro */}
      <ModalRecuRegeContrasenia
        mostrar={showRegistroModal}
        cerrarModal={handleCloseRegistroModal}
        titulo="Registro"
      >
        <Formulario
          campos={camposRegistro}
          onSubmit={handleRegistroFormSubmit}
          className="form-registro"
        />
        <Botones
          children="Registrar"
          onClick={() => handleRegistroFormSubmit()}
        />
      </ModalRecuRegeContrasenia>

      {/* Modal de Actualización */}
      <ModalRecuRegeContrasenia
        mostrar={showActualizacionModal}
        cerrarModal={handleCloseActualizacionModal}
        titulo="Actualización"
      >
        <Formulario
          campos={camposActualizacion}
          onSubmit={handleActualizacionFormSubmit}
          className="form-actualizacion"
        />
          <Botones
          children="Registrar"
          onClick={() => handleRegistroFormSubmit()}
        />
      </ModalRecuRegeContrasenia>
    </div>
  );
}

export default Variedad;
