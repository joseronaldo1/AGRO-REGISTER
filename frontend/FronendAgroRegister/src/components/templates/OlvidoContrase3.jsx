import React from 'react';
import Formulario from '../organismos/Formulario.jsx';
import Botones from '../atomos/Botones.jsx';
import { Link } from 'react-router-dom';
import HeaderInicio from '../organismos/Header/HeaderInicio.jsx';

 const Olvidopasstree = () => {
     const campos = [
         { name: 'password', type: 'password', placeholder: 'Contraseña Nueva' },
         { name: 'password2', type: 'password', placeholder: 'Confirmación de Contraseña' },
     ];
    
     const formularioStyle = {
         border: '1px solid #ccc', 
         borderRadius: '5px', 
         padding: '20px', 
         margin: '20px auto', 
         maxWidth: '400px', 
       

     };

     return (
         <div className='flex' style={{margin:'150px'}}>
             <HeaderInicio/>
             <div className='flex items-center justify-center'>
                 <form style={formularioStyle}>
                     <label className="text-xl font-bold flex justify-center items-center p-10">Cambio de Contraseña</label>
                     <div style={{marginTop :'100px'}}>
                         <Formulario campos={campos} />
                     </div>
                     <div className='flex flex-col m-5 justify-center items-center'>
                         <Link to='/'>
                         <Botones children='Enviar' />
                         </Link>
                    </div>
                
                 </form>
               
                
             </div>
         </div>
     );
 };
export default Olvidopasstree;