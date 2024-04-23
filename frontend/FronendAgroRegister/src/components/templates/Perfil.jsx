import React from 'react';
import Botones from '../atomos/Botones.jsx';
import { Link } from 'react-router-dom';
import Header from '../organismos/Header/Header.jsx';
import Footer from '../organismos/Footer/Footer';
import Formulario from '../organismos/Formulario.jsx';

const Perfilprincipal = () => {
     const campos = [
         { name: 'nombres', type: 'text', placeholder: 'Nombres' },
         { name: 'apellidos', type: 'text', placeholder: 'Apellidos' },
         { name: 'correo', type: 'email', placeholder: 'Correo' },
         { name: 'direccion', type: 'text', placeholder: 'Dirección' },
         { name: 'rol', type: 'text', placeholder: 'Rol' },
     ];
    
     const formularioStyle = {
         padding: '20px',
         margin: '80px auto',
         maxWidth: '800px',
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
         borderRadius: '10px'
     };

     const labelStyle = {
         fontSize: '36px',
         fontWeight: 'bold',
         marginBottom: '20px',
         color: 'black',
     };

     const botonesContainer = {
         display: 'flex',
         justifyContent: 'space-between',
         padding: '20px',
     };

     return (
         <div style={{ display: 'flex', justifyContent: 'center', margin: '60px'}}>
             <Header/> 
             <div style={formularioStyle}>
                 <label style={labelStyle}>Perfil</label>
                 <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', margin:'12px'}}>
                     <Formulario campos={campos.slice(0, 3)}/>
                     <Formulario campos={campos.slice(3, 5)}/>
                 </div>
                 <div style={botonesContainer}>
                   <Link to='/perfil'>
                         <Botones children='editar' style={{ backgroundColor: 'green', border: 'none', padding: '10px 20px', borderRadius: '5px', color: 'white', fontWeight: 'bold'}} />
                     </Link>
                     <Link to='/finca'>
                         <Botones children='aceptar' style={{ backgroundColor: 'red', border: 'none', padding: '10px 20px', borderRadius: '5px', color: 'white', fontWeight: 'bold' }} />
                     </Link>
                 </div>
             </div>
             <Footer/>
         </div>
     );
 };
 export default Perfilprincipal;