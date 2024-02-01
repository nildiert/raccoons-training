// En src/components/FooterNav.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faRunning, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import './FooterNav.css'; // Asegúrate de crear este archivo CSS para estilos

const FooterNav = () => {
  return (
    <div className="footer-nav">
      <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <FontAwesomeIcon icon={faHome} />
      </NavLink>
      <NavLink to="/training" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <FontAwesomeIcon icon={faRunning} />
      </NavLink>
      <NavLink to="/shopping" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <FontAwesomeIcon icon={faShoppingBasket} />
      </NavLink>
    </div>
  );
};

export default FooterNav;
