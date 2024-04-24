import React, { useState } from "react";
import Boton from "../atomos/Botones";
import Header from "../organismos/Header/Header";
import Footer from '../organismos/Footer/Footer';

function Reportes() {
   // Estado para controlar la visibilidad de la información adicional
   const [mostrarInformacion, setMostrarInformacion] = useState(false);

   return (
    <div>
     <div className="container" style={{ marginTop: "8%" }}>
       <Header/>
       <h2 style={{ display: "inline-block", marginRight: "20px" }}>Reporte Ingresos y Egresos</h2>
       <div style={{ float: "right", marginRight: "20px" }}>
         <Boton children="Descargar" onClick={() => handleOpenModal("Registrar")} />
       </div>
       <hr />
       <div className="row">
         <div className="col-md-6" style={{ borderRight: "1px solid #ccc" }}>
           <h4>Finca Santa Monica</h4>
           <div className="row">
             <div className="col-md-6">
               <h3>Ingresos Totales</h3>
               {/* Espacio para mostrar los ingresos totales */}
             </div>
             <div className="col-md-6">
               <h3>Egresos Totales</h3>
               {/* Espacio para mostrar los egresos totales */}
             </div>
           </div>
         </div>
         <div className="col-md-6">
           <h4>Ingresos y Egresos Totales de Toda la Producción</h4>
           <div className="row">
             <div className="col-md-6">
               <h3>Ingresos Totales</h3>
               {/* Espacio para mostrar los ingresos totales */}
             </div>
             <div className="col-md-6">
               <h3>Egresos Totales</h3>
               {/* Espacio para mostrar los egresos totales */}
             </div>
           </div>
         </div>
       </div>
       {mostrarInformacion && (
         <div>
           {/* Aquí iría más información */}
           <p>Más información..</p>
         </div>
       )}
       
     </div>
     <Footer/>
     </div>
 );
 }

 export default Reportes;
