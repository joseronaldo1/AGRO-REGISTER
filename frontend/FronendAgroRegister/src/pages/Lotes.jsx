import React, { useState } from "react";
import Botones from "../components/atomos/Botones";
import { Datatable } from "../components/moleculas/Datatable";
import ModalRecuRegeContrasenia from "../components/organismos/Modal";
import Header from "../components/organismos/Header/Header";
import Formulario from '../components/organismos/Formulario.jsx';

function Lotes() {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [formData, setFormData] = useState({
    Identificacion: "",
    Nombre: "",
    Longitud: "",
    Latitud: "",
    Finca: "",
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
      Identificacion: "",
      Nombre: "",
      Longitud: "",
      Latitud: "",
      Finca: "",
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

  const handleDesactivarClick = () => {
    alert(`¿Quieres desactivar el lote?`);
  };

  const columns = [
    { name: "Identificacion", selector: (row) => row.Identificacion, sortable: true },
    { name: "Nombre", selector: (row) => row.Nombre, sortable: true },
    { name: "Longitud", selector: (row) => row.Longitud, sortable: true },
    { name: "Latitud", selector: (row) => row.Latitud, sortable: true },
    { name: "Finca", selector: (row) => row.Finca, sortable: true },
    { 
      name: "Acciones", 
      cell: (row) => (
<div>
    <button className="btn btn-danger p-2 rounded-lg text-sm font-bold mt-2" type="button" style={{ backgroundColor: '#FF0000', width: '100%' }} onClick={() => handleDesactivarClick(row.Lote)}>
        Desactivar
    </button>
    <br /> {/* Agregar un salto de línea para separar los botones */}
    <button className="btn btn-warning p-2 rounded-lg text-sm font-bold mt-2 mb-2" type="button" style={{ width: '100%' }} onClick={() => handleOpenModal("Actualizar")}>
        Editar
    </button>
</div>

      ),
    },
  ];

  const data = [
    {
      Identificacion: 1,
      Nombre: "Ángel Córdoba",
      Longitud: 16.159519,
      Latitud: -38.837416,
      Finca: "Yamboro",
    },
    // Agrega más filas según necesites
  ];

  const camposRegistro = [
    { name: "Identificacion", placeholder: "Identificación", type: "number" },
    { name: "Nombre", placeholder: "Nombre", type: "text" },
    { name: "Longitud", placeholder: "Longitud", type: "number" },
    { name: "Latitud", placeholder: "Latitud", type: "number" },
    { name: "Finca", placeholder: "Finca", type: "text" },
  ];

  return (
    <div style={{ marginTop: "8%" }}>
      <Header />
      <div className="container mt-5">
        <Botones children="Registrar" onClick={() => handleOpenModal("Registrar")} />
        <Datatable columns={columns} data={data} title="Lotes" />
      </div>

      {/* Modal de Lotes */}
      <ModalRecuRegeContrasenia
        mostrar={showModal}
        cerrarModal={handleCloseModal}
        titulo={modalTitle}
      >
        <Formulario
          campos={camposRegistro}
          onSubmit={handleFormSubmit}
          className="form-lotes"
        />
        <Botones
          children="Registrar"
          onClick={() => handleFormSubmit()}
        />
      </ModalRecuRegeContrasenia>
    </div>
  );
}

export default Lotes;
