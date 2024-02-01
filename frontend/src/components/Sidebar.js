// En src/components/Sidebar.js
import React from 'react';
import Profile from './Profile';
import './Sidebar.css'; // Archivo CSS para estilos del sidebar
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isOpen, closeSidebar }) => {

  const animationName = isOpen ? 'slideIn' : 'slideOut';


  return (
    <div className="sidebar" style={{ animationName: animationName }}>
      <button className="close-sidebar" onClick={closeSidebar}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <Profile />
    </div>
  );
};
export default Sidebar;
