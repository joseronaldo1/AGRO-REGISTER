import React from 'react'
import NavItem from '../../moleculas/Sidebar/NavItem'
import './Sidebar.css';
import v from '../../../styles/variables';

function Sidebar() {
  return (
    <div className='justify-content-start'>
                  <div className="offcanvas offcanvas-start bgMenu" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
            <img className='imagenpersonal' src={v.Imagepersona} alt="Imagen 2" style={{ width: '100px', objectFit: 'cover', height: '100px' }} />
            <h1 style={{ textAlign:'center', fontSize:'29px', paddingTop:'20px' }}>Sergio C</h1>
              <ul className="navbar-nav ">
                {/* <NavItem icon={v.iconoPerfilUsuario} text="Perfil" href="/Perfilprincipal" /> */}
                <NavItem icon={v.iconoFinca} text="Finca" href="/finca" />
                <NavItem icon={v.iconoCultivo} text="Cultivos" href="/cultivo" />
                <NavItem icon={v.iconoTractor} text="Lotes" href="/lotes" />
                <NavItem icon={v.iconoCultivo} text="Variedad" href="/variedad" />
                <NavItem icon={v.iconoActividad} text="Actividad" href="/actividad" />
                <NavItem icon={v.iconoTractor} text="Recursos" href="/recursos" />
                <NavItem icon={v.iconoTractor} text="nada" href="/prueba" />
                <NavItem icon={v.iconoReporte} text="Reportes" href="/reportes" />
               {/*  <NavItem icon={v.iconoSoporte} text="Soporte" href="/soport" /> */}
                {/* <NavItem icon={v.iconoSalir} text="Salir" href="/" /> */}
              </ul>

            </div>
          </div>
    </div>
  )
}

export default Sidebar