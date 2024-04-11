import React, { useState } from "react";
import axios from 'axios';
import Botones from "../components/atomos/Botones";
import { Datatable } from "../components/moleculas/Datatable";
import ModalRecuRegeContrasenia from "../components/organismos/Modal";
import Header from "../components/organismos/Header/Header";
import Formulario from '../components/organismos/Formulario.jsx';

const unidadesMedidaEnum = ['ml', 'litro', 'g', 'kg', 'unidad'];

function Recursos() {
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [showActualizacionModal, setShowActualizacionModal] = useState(false);
  const [registroFormData, setRegistroFormData] = useState({
    nombre_recursos: "",
    cantidad_medida: "",
    unidades_medidas: "",
    extra: "",
  });
  const [actualizacionFormData, setActualizacionFormData] = useState({
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

  const handleRegistroFormSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    try {
      const response = await axios.post('http://localhost:3000/RegistroRecurso', registroFormData);
      console.log("Datos de registro:", response.data);
      setRegistroFormData({
        nombre_recursos: "",
        cantidad_medida: "",
        unidades_medidas: "",
        extra: "",
      });
      handleCloseRegistroModal();
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  const handleActualizacionFormSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    try {
      const response = await axios.put('http://localhost:3000/actualizarRecurso/:id', actualizacionFormData);
      console.log("Datos de actualización:", response.data);
      setActualizacionFormData({
        nombre_recursos: "",
        cantidad_medida: "",
        unidades_medidas: "",
        extra: "",
      });
      handleCloseActualizacionModal();
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  const camposRegistro = [
    { name: "nombre_recursos", placeholder: "Nombre Recursos", type: "text" },
    { name: "cantidad_medida", placeholder: "Cantidad Medida", type: "number" },
    { name: "unidades_medidas", placeholder: "Unidades Medidas", type: "text" },
    { name: "extra", placeholder: "Extra", type: "text" }
  ];

  const camposActualizacion = [
    { name: "nombre_recursos", placeholder: "Nombre Recursos", type: "text" },
    { name: "cantidad_medida", placeholder: "Cantidad Medida", type: "number" },
    { name: "unidades_medidas", placeholder: "Unidades Medidas", type: "text" },
    { name: "extra", placeholder: "Extra", type: "text" }
  ];

  const columns = [
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
      nombre_recursos: "Agua",
      cantidad_medida: "500",
      unidades_medidas: "Litros",
      extra: "Nada",
    },
    {
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
