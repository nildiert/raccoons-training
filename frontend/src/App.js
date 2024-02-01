import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Runners from './components/training/Runners'
import ActiveWeek from './components/training/ActiveWeek';
import Profile from './components/Profile'
import FooterNav from './components/FooterNav';
import Header from './components/Header'; // Asegúrate de importar el Header
import Shopping from './components/Shopping';



import './App.css';

function App() {
  const [currUser, setCurrUser] = useState(localStorage.getItem("token") !== null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  useEffect(() => {
    setCurrUser(localStorage.getItem("token") !== null);
  }, []);

  return (
    <Router>      
      {currUser &&     <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />}
      <div className="container-fluid">
        <Routes>
          <Route path="/login" element={currUser ? <Navigate to="/home" /> : <Login setCurrUser={setCurrUser} />} />
          <Route path="/home" element={currUser ? <HomePage currUser={currUser} /> : <Navigate to="/login" />} />
          <Route path="/training" element={currUser ? <ActiveWeek currUser={currUser} /> : <Navigate to="/login" />} />
          <Route path="/runners" element={currUser ? <Runners currUser={currUser} /> : <Navigate to="/login" />} />
          <Route path="/profile" element={currUser ? <Profile currUser={currUser} /> : <Navigate to="/login" />} />
          <Route path="/shopping" element={currUser ? <Shopping currUser={currUser} /> : <Navigate to="/login" />} />
          {/* Agrega más rutas según sea necesario */}
        </Routes>
      </div>
      {currUser && <FooterNav />} 
    </Router>
  );
}

export default App;
