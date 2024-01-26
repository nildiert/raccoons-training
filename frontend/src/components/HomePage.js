// En src/components/HomePage.js
import React from 'react';
import ActiveWeek from './training/ActiveWeek';

const HomePage = ({ currUser }) => {
    return (
        <div>
            {/* Contenido de la página principal */}
            <h1>Plan de Entrenamiento Actual</h1>
            <ActiveWeek currUser={currUser} />
            {/* Puedes agregar más contenido aquí */}
        </div>
    );
};

export default HomePage;
