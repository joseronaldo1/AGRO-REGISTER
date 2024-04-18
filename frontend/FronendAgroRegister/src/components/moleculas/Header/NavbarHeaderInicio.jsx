import React from 'react'
import Image from '../../atomos/Logo'
import './Navbar.css'

function NavbarHeaderInicio() {
  return (
    <div>
      <nav className="navbar bg-#00800 fixed-top">
        <div className="d-flex container aling-items-start">
          <a className="navbar-brand text-white font-weight-bold fs-4 active" href="#">AGRO-REGISTER</a>
          <Image style={{ width: "100px", height: "100px" }} />
        </div>
      </nav>
    </div>
  )
}

export default NavbarHeaderInicio