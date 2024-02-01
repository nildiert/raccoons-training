import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import './Header.css'; // Archivo CSS para estilos del header

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <div className="header">
      <FontAwesomeIcon icon={faUserCircle} size="2x" onClick={toggleSidebar} />
      {isSidebarOpen && <Sidebar isOpen={isSidebarOpen} closeSidebar={toggleSidebar} />}
    </div>
  );
};

export default Header;
