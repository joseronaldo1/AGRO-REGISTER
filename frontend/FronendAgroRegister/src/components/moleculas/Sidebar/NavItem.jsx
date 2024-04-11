// components/molecules/NavItem/NavItem.js
import React from 'react';
import Icon from '../../atomos/Sidebar/IconosSidebar';
import './NavItem.css'; // Importa la hoja de estilos

const NavItem = ({ icon, text, href }) => (
 <li className="nav-item ms-4 list-group-item d-flex align-items-center">
    <a className="nav-link" aria-current="page" href={href}>
      <Icon icon={icon} className="icon-text-white" />
      {text}
    </a>
 </li>
);

export default NavItem;
