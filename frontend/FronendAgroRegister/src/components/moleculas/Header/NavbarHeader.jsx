import React from 'react'
import Image from '../../atomos/Logo'
import './Navbar.css'
import v from '../../../styles/variables';

function NavbarHeader() {
  return (
    <nav className="navbar bg-#00800 fixed-top p-1">
    <div className="d-flex container aling-items-center">
    <button className="btn shadow-none navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span><Image style={{ width: "60px", height: "60px" }} /></span>
      </button>
      <h1>AGRO-REGISTER</h1>
      <img className='imagenpersonal' src={v.Imagepersona} alt="Imagen 2" style={{ width: '100px', objectFit: 'cover', height: '100%' }} />
    </div>
  </nav>
  )
}

export default NavbarHeader