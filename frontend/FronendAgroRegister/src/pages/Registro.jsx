
import React, { useState } from 'react';
import FormularioRegistroUsuario from '../components/moleculas/Formulario/FromReUsuario';
import HeaderInicio from '../components/organismos/Header/HeaderInicio.jsx';


export const Registro = () => {
    return (
        <div>
          
          {/* <HeaderInicio/> */}
          <FormularioRegistroUsuario />
        </div>
      );
}

export default Registro;


import { default as Registro } from "../components/templates/Registro";
export const RegistroPage = () => {
  return (<Registro/>);
}

