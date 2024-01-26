import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import './App.css';

function App() {
  const [currUser, setCurrUser] = useState(null);

  return (
    <Router>
      <div className="container-fluid">
        <Routes>
          <Route path="/login" element={currUser ? <Navigate to="/" /> : <Login setCurrUser={setCurrUser} />} />
          <Route path="/" element={currUser ? <HomePage currUser={currUser} /> : <Navigate to="/login" />} />
          {/* Agrega más rutas según sea necesario */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
