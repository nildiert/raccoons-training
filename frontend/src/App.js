import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Runners from './components/training/Runners'
import './App.css';

function App() {
  const [currUser, setCurrUser] = useState(localStorage.getItem("token") !== null);

  useEffect(() => {
    setCurrUser(localStorage.getItem("token") !== null);
  }, []);

  return (
    <Router>
      <div className="container-fluid">
        <Routes>
          <Route path="/login" element={currUser ? <Navigate to="/home" /> : <Login setCurrUser={setCurrUser} />} />
          <Route path="/home" element={currUser ? <HomePage currUser={currUser} /> : <Navigate to="/login" />} />
          <Route path="/runners" element={currUser ? <Runners currUser={currUser} /> : <Navigate to="/login" />} />
          {/* Agrega más rutas según sea necesario */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
