// WorkingDay.js
import React from 'react';

const WorkingDay = ({ details }) => {
    if (!details) return null;

    return (
        <div>
            <h2>Detalle del Día de Entrenamiento</h2>
            <p>Tipo: {details.kind}</p>
            <p>Duración: {details.duration} minutos</p>
            <p>Fecha: {details.date}</p>
            <p>Descripción: {details.description || 'No disponible'}</p>
            <p>Completado: {details.completed ? 'Sí' : 'No'}</p>
        </div>
    );
};

export default WorkingDay;
