import React, { useState, useEffect } from 'react';
import CreateTrainingPlanModal from './CreateTrainingPlanModal';
import TrainingPlanModal from './TrainingPlanModal';

const Runners = () => {
    const [showModal, setShowModal] = useState(false);
    const [runners, setRunners] = useState([]);
    const [selectedRunnerId, setSelectedRunnerId] = useState(null);
    const [showTrainingPlanModal, setShowTrainingPlanModal] = useState(false);
    const [selectedTrainingPlanId, setSelectedTrainingPlanId] = useState(null);
    const [currentTrainingPlan, setCurrentTrainingPlan] = useState(null);



    const handleSubmit = async (formData) => {
        try {
            const response = await fetch('http://localhost:3000/training_plans/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({ ...formData, user_id: selectedRunnerId })
            });
            if (!response.ok) {
                throw new Error('Error al crear el plan de entrenamiento');
            }
            const data = await response.json();
            fetchRunners(); // Opcional: recargar la lista de corredores si es necesario
            return data; // Devuelve los datos del plan creado
        } catch (error) {
            console.error('Error:', error);
            return null; // Devuelve null en caso de error
        }
    };

    const handleViewTrainingPlanClick = async (trainingPlanId) => {
        setSelectedTrainingPlanId(trainingPlanId);
        try {
            const response = await fetch(`http://localhost:3000/training_plans/${trainingPlanId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": localStorage.getItem("token")
                }
            });
            if (!response.ok) throw new Error('Error al obtener el plan de entrenamiento');
            const data = await response.json();
            console.log(data)
            setCurrentTrainingPlan(data);
            setShowTrainingPlanModal(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCreatePlanClick = (runnerId) => {
        setSelectedRunnerId(runnerId);
        setShowModal(true);
      };
    

    const fetchRunners = async () => {
        try {
            const response = await fetch('http://localhost:3000/runners/index', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": localStorage.getItem("token")
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
        <div className="container my-3">
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Nombre y Apellidos</th>
                            <th>Tiene Plan de Entrenamiento</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {runners.map((runner, index) => (
                            <tr key={index}>
                                <td>{`${runner.profile.first_name || ''} ${runner.profile.second_name || ''} ${runner.profile.last_name || ''} ${runner.profile.second_last_name || ''}`.trim()}</td>
                                <td>{runner.has_training_plan ? 'Sí' : 'No'}</td>
                                <td>
                                    <button className="btn btn-warning text-white mx-2 my-1" onClick={() => handleViewTrainingPlanClick(runner.current_training_plan.id)}>
                                        Ver plan
                                    </button>
                                    <button className="btn btn-primary mx-2 my-1" onClick={() => handleCreatePlanClick(runner.id)}>
                                        Crear Plan
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <CreateTrainingPlanModal 
                show={showModal} 
                handleClose={() => setShowModal(false)} 
                handleSubmit={handleSubmit}
            />
            {showTrainingPlanModal && <TrainingPlanModal 
                show={showTrainingPlanModal} 
                handleClose={() => setShowTrainingPlanModal(false)}
                trainingPlan={currentTrainingPlan}
            />}
        </div>
    );
};

export default Runners;