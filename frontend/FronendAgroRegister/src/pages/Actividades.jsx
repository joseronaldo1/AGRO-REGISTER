import React, { useState } from "react";
import Botones from "../components/atomos/Botones";
import { Datatable } from "../components/moleculas/Datatable";
import ModalRecuRegeContrasenia from "../components/organismos/Modal";
import Header from "../components/organismos/Header/Header";
import Formulario from '../components/organismos/Formulario.jsx';

function Actividad() {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [formData, setFormData] = useState({
    nombreActividad: "",
    tiempo: "",
    valorActividad: "",
    observaciones: "",
    tipoCultivo: "",
  });

  const handleOpenModal = (title) => {
    setShowModal(true);
    setModalTitle(title);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    setFormData({
      nombreActividad: "",
      tiempo: "",
      valorActividad: "",
      observaciones: "",
      tipoCultivo: "",
    });
    handleCloseModal();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDesactivarClick = (fechaInicio) => {
    alert(`¿Quieres desactivar el cultivo con fecha de inicio ${fechaInicio}?`);
  };

  const columns = [
    { name: "Nombre Actividad", selector: (row) => row.nombreActividad, sortable: true },
    { name: "Tiempo", selector: (row) => row.tiempo, sortable: true },
    { name: "Valor Actividad", selector: (row) => row.valorActividad, sortable: true },
    { name: "Observaciones", selector: (row) => row.observaciones, sortable: true },
    { name: "Tipo de Cultivo", selector: (row) => row.tipoCultivo, sortable: true },
    { 
      name: "Acciones", 
      cell: (row) => (
        <div>
          <button className="btn btn-danger p-2 rounded-lg text-sm font-bold mt-2" type="button" onClick={() => handleDesactivarClick(row.fecha_inicio)}>
            Desactivar
          </button>
          <br /> {/* Agregar un salto de línea para separar los botones */}
          <button className="btn btn-warning p-2 rounded-lg text-sm font-bold mt-2" type="button" onClick={() => handleOpenModal("Actualizar")}>
            Actualizar
          </button>
        </div>
      ),
    },
  ];

  const data = [
    {
      nombreActividad: "Guadañar",
      tiempo: "2:00",
      valorActividad: 20000,
      observaciones: "Bien",
      tipoCultivo:"Cebolla"
    }
  ];

  const camposRegistro = [
    { name: "Nombre Actividad", placeholder: "Nombre actividad", type: "text" },
    { name: "Tiempo", placeholder: "tiempo", type: "date"},
    { name: "Valor Actividad", placeholder: "Valor actividad", type: "number" },
    { name: "Observaciones", placeholder: "Observaciones", type: "text" },
    { name: "Tipo de Cultivo", placeholder: "tipo de cultivos", type: "text" },
  ];

  return (
    <div style={{ marginTop: "8%" }}>
      <Header />
      <div className="container mt-5">
        <Botones children="Registrar" onClick={() => handleOpenModal("Registrar")} />
        <Datatable columns={columns} data={data} title="Actividad" />
      </div>

      {/* Modal de Cultivos */}
      <ModalRecuRegeContrasenia
        mostrar={showModal}
        cerrarModal={handleCloseModal}
        titulo={modalTitle}
      >
        <Formulario
          campos={camposRegistro}
          onSubmit={handleFormSubmit}
          className="form-cultivos"
        />
        <Botones
          children="Registrar"
          onClick={() => handleFormSubmit()}
        />
      </ModalRecuRegeContrasenia>
    </div>
  );
}

export default Actividad;
