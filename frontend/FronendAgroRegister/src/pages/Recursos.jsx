import React, { useState } from "react";
import Botones from "../components/atomos/Botones";
import { Datatable } from "../components/moleculas/Datatable";
import ModalRecuRegeContrasenia from "../components/organismos/Modal";
import Header from "../components/organismos/Header/Header";
import Formulario from '../components/organismos/Formulario.jsx';

function Recursos() {
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [showActualizacionModal, setShowActualizacionModal] = useState(false);
  const [registroFormData, setRegistroFormData] = useState({
    precio: "",
    nombre_recursos: "",
    cantidad_medida: "",
    unidades_medidas: "",
    extra: "",
  });
  const [actualizacionFormData, setActualizacionFormData] = useState({
    precio: "",
    nombre_recursos: "",
    cantidad_medida: "",
    unidades_medidas: "",
    extra: "",
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
        precio: "",
        nombre_recursos: "",
        cantidad_medida: "",
        unidades_medidas: "",
        extra: "",
    });
    handleCloseRegistroModal();
  };

  const handleActualizacionFormSubmit = (event) => {
    event.preventDefault();
    console.log("Datos de actualización:", actualizacionFormData);
    setActualizacionFormData({
        precio: "",
        nombre_recursos: "",
        cantidad_medida: "",
        unidades_medidas: "",
        extra: "",
    });
    handleCloseActualizacionModal();
  };

  const camposRegistro = [
    { name: "precio", placeholder: "Precio", type: "number" },
    { name: "nombre_recursos", placeholder: "Nombre Recursos", type: "text" },
    { name: "cantidad_medida", placeholder: "Cantidad Medida", type: "number" },
    { name: "unidades_medidas", placeholder: "Unidades Medidas", type: "number" },
    { name: "extra", placeholder: "Extra", type: "text" }
  ];

  const camposActualizacion = [
    { name: "precio", placeholder: "Precio", type: "number" },
    { name: "nombre_recursos", placeholder: "Nombre Recursos", type: "text" },
    { name: "cantidad_medida", placeholder: "Cantidad Medida", type: "number" },
    { name: "unidades_medidas", placeholder: "Unidades Medidas", type: "number" },
    { name: "extra", placeholder: "Extra", type: "text" }
  ];

  const columns = [
    {
      name: "precio",
      selector: (row) => row.precio,
      sortable: true,
    },
    {
      name: "nombre_recursos",
      selector: (row) => row.nombre_recursos,
      sortable: true,
    },
    {
      name: "cantidad_medida",
      selector: (row) => row.cantidad_medida,
      sortable: true,
    },
    {
      name: "unidades_medidas",
      selector: (row) => row.unidades_medidas,
      sortable: true,
    },
    {
        name: "extra",
        selector: (row) => row.extra,
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
        precio: "1.000",
        nombre_recursos: "Agua",
        cantidad_medida: "500",
        unidades_medidas: "Litros",
        extra: "Nada",
    },
    {
        precio: "2.000",
        nombre_recursos: "Fertilizantes",
        cantidad_medida: "50",
        unidades_medidas: "Kilos",
        extra: "NPK",
    },
    // Agrega más filas según necesites
  ];

  return (
    <div style={{ marginTop: "8%" }}>
      <Header />
      <div className="container mt-5">
        <Botones
          children="Registrar"
          onClick={() => handleOpenRegistroModal()}
        />
        <Datatable columns={columns} data={data} title="Recursos" />
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

export default Recursos;
