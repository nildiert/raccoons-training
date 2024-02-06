// En src/components/Sidebar.js
import React from 'react';
import Profile from './Profile';
import './Sidebar.css'; // Archivo CSS para estilos del sidebar
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { httpService } from '../services/httpService';

const Sidebar = ({ isOpen, closeSidebar }) => {

  const animationName = isOpen ? 'slideIn' : 'slideOut';

  const logout = async () => {
    try {
      await httpService.delete('/logout', {});

      localStorage.removeItem('token');
      localStorage.removeItem('userId');

      window.location.href = '/login';
    } catch (error) {
      console.log('Error cerrando sesión', error)
    }
  };


  return (
    <div className="sidebar" style={{ animationName: animationName }}>
      <button className="close-sidebar" onClick={closeSidebar}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <Profile />
      <div className='d-flex justify-content-center '>
        <button className='btn btn-secondary btn-block ' onClick={logout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
