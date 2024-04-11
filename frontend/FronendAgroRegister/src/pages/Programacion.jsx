import React, { useState } from "react";
import Botones from "../components/atomos/Botones";
import { Datatable } from "../components/moleculas/Datatable";
import ModalRecuRegeContrasenia from "../components/organismos/Modal";
import Header from "../components/organismos/Header/Header";
import Formulario from '../components/organismos/Formulario.jsx';

function Programacion() {
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [showActualizacionModal, setShowActualizacionModal] = useState(false);
  const [registroFormData, setRegistroFormData] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    Usuario: "",
    Actividad: "",
    cultivo: ""
  });
  const [actualizacionFormData, setActualizacionFormData] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    Usuario: "",
    Actividad: "",
    Ciltivo: ""
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
        fecha_inicio: "",
        fecha_fin: "",
        Usuario: "",
        Actividad: "",
        cultivo: ""
    });
    handleCloseRegistroModal();
  };

  const handleActualizacionFormSubmit = (event) => {
    event.preventDefault();
    console.log("Datos de actualización:", actualizacionFormData);
    setActualizacionFormData({
        fecha_inicio: "",
        fecha_fin: "",
        Usuario: "",
        Actividad: "",
        cultivo: ""
    });
    handleCloseActualizacionModal();
  };

  const camposRegistro = [
    { name: "fecha_inicio", placeholder: "Fecha Inicio", type: "date" },
    { name: "fecha_fin", placeholder: "Fecha Fin", type: "date" },
    { name: "usuario", placeholder: "Usario", type: "number" },
    { name: "Actividad", placeholder: "Actividad", type: "number" },
    { name: "cultivo", placeholder: "Cultivo", type: "number" }
  ];

  const camposActualizacion = [
    { name: "fecha_inicio", placeholder: "Fecha Inicio", type: "date" },
    { name: "fecha_fin", placeholder: "Fecha Fin", type: "date" },
    { name: "usuario", placeholder: "Usario", type: "number" },
    { name: "Actividad", placeholder: "Actividad", type: "number" },
    { name: "cultivo", placeholder: "Cultivo", type: "number" }
  ];

  const columns = [
    {
      name: "Fecha Inicio",
      selector: (row) => row.fecha_inicio,
      sortable: true,
    },
    {
      name: "Fecha Fin",
      selector: (row) => row.fecha_fin,
      sortable: true,
    },
    {
      name: "Usario",
      selector: (row) => row.Usuario,
      sortable: true,
    },
    {
      name: "Actividad",
      selector: (row) => row.Actividad,
      sortable: true,
    },
    
    {
        name: "Cultivo",
        selector: (row) => row.cultivo,
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
        fecha_inicio: "2024/09/02",
        fecha_fin: "2024/09/12",
        Usuario: "1",
        Actividad: "1",
        cultivo: "1"
    },
    
  ];

  return (
    <div style={{ marginTop: "8%" }}>
      <Header />
      <div className="container mt-5">
      <Botones children="Registrar" onClick={() => handleOpenModal("Registrar")} />
        <Datatable columns={columns} data={data} title="Programación" />
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
    <div className="container mt-5">
      <Botones children="Registrar" onClick={() => handleOpenModal("Editar")} />
      </div>
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

export default Programacion;
