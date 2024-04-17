import React, { useState } from "react";
import Botones from "../atomos/Botones";
import { Datatable } from "../moleculas/Datatable";
import ModalRecuRegeContrasenia from "../organismos/Modal";
import Header from "../organismos/Header/Header";
import Formulario from '../organismos/Formulario.jsx';
 function Cultivos() {
   const [showModal, setShowModal] = useState(false);
   const [modalTitle, setModalTitle] = useState("");
   const [formData, setFormData] = useState({
     fecha_inicio: "",
     cantidad_sembrada: "",
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
       fecha_inicio: "",
       cantidad_sembrada: "",
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
     { name: "Fecha de inicio", selector: (row) => row.fecha_inicio, sortable: true },
     { name: "Cantidad Sembrada", selector: (row) => row.cantidad_sembrada, sortable: true },
     { name: "Estado", selector: (row) => row.estado, sortable: true },
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
       fecha_inicio: "12/03/2024",
       cantidad_sembrada: "5",
       estado: "Activo",
     },
     {
       fecha_inicio: "08/01/2024",
       cantidad_sembrada: "8",
       estado: "Activo",
     },
   ];

   const camposRegistro = [
     { name: "fecha_inicio", placeholder: "Fecha de inicio", type: "text" },
     { name: "cantidad_sembrada", placeholder: "Cantidad Sembrada", type: "text" },
   ];

   return (
     <div style={{ marginTop: "8%" }}>
       <Header />
       <div className="container mt-5">
         <Botones children="Registrar" onClick={() => handleOpenModal("Registrar")} />
         <Datatable columns={columns} data={data} title="Cultivos" />
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
 export default Cultivos;
