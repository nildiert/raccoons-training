import React, { useState, useEffect } from 'react';

const Runners = () => {
    const [runners, setRunners] = useState([]);

    const fetchRunners = async () => {
        try {
            const response = await fetch('http://localhost:3000/runners/index', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Incluye otros headers si son necesarios, como un token de autenticación
                }
            });
            if (!response.ok) throw new Error('Error en la solicitud');
            const data = await response.json();
            setRunners(data);
        } catch (error) {
            console.error('Error al obtener los corredores:', error);
        }
    };

    useEffect(() => {
        fetchRunners();
    }, []);

    return (
        <div>
            <button className="btn btn-primary">Crear plan de entrenamiento para estos corredores</button>
            <ul>
                {runners.map((runner, index) => (
                    <li key={index}>
                        <input type="checkbox" id={`runner-${index}`} />
                        <label htmlFor={`runner-${index}`}>{runner.email}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Runners;
