import React, { useState } from "react";
import Botones from "../components/atomos/Botones";
import { Datatable } from "../components/moleculas/Datatable";
import ModalRecuRegeContrasenia from "../components/organismos/Modal";
import Header from "../components/organismos/Header/Header";
import Formulario from '../components/organismos/Formulario.jsx';

function Finca() {
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [showActualizacionModal, setShowActualizacionModal] = useState(false);
  const [registroFormData, setRegistroFormData] = useState({
    nombre_variedad: "",
    nombre_actividad: "",
    tipo_recurso: "",
    tiempo: "",
  });
  const [actualizacionFormData, setActualizacionFormData] = useState({
    nombre_variedad: "",
    nombre_actividad: "",
    tipo_recurso: "",
    tiempo: "",
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
      nombres: "",
      apellidos: "",
      correo: "",
      contraseña: "",
    });
    handleCloseRegistroModal();
  };

  const handleActualizacionFormSubmit = (event) => {
    event.preventDefault();
    console.log("Datos de actualización:", actualizacionFormData);
    setActualizacionFormData({
      nombres: "",
      apellidos: "",
      correo: "",
      contraseña: "",
    });
    handleCloseActualizacionModal();
  };

  const camposRegistro = [
    { name: "nombres", placeholder: "Nombres", type: "text" },
    { name: "apellidos", placeholder: "Apellidos", type: "text" },
    { name: "correo", placeholder: "correo", type: "text" },
    { name: "contraseña", placeholder: "contraseña", type: "text" }
  ];

  const camposActualizacion = [
    { name: "nombres", placeholder: "Nombres", type: "text" },
    { name: "apellidos", placeholder: "Apellidos", type: "text" },
    { name: "correo", placeholder: "correo", type: "text" },
    { name: "contraseña", placeholder: "contraseña", type: "text" }
  ];

  const columns = [
    {
      name: "Nombres",
      selector: (row) => row.nombres,
      sortable: true,
    },
    {
      name: "Apellidos",
      selector: (row) => row.apellidos,
      sortable: true,
    },
    {
      name: "Correo",
      selector: (row) => row.correo,
      sortable: true,
    },
    {
      name: "Contraseña",
      selector: (row) => row.contraseña,
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
      nombres: "juana",
      apellidos: "Ortiz",
      correo: "rodolfo@gmail.com",
      contraseña: "394435",
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
        <Datatable columns={columns} data={data} title="Usuarios" />
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

export default Finca;
