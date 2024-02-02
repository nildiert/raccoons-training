import React, { useState, useEffect } from 'react';
import CreateTrainingPlanModal from './CreateTrainingPlanModal';
import TrainingPlanModal from './TrainingPlanModal';
import { httpService } from '../../services/httpService';

const Runners = () => {
    const [showModal, setShowModal] = useState(false);
    const [runners, setRunners] = useState([]);
    const [selectedRunnerId, setSelectedRunnerId] = useState(null);
    const [showTrainingPlanModal, setShowTrainingPlanModal] = useState(false);
    const [currentTrainingPlan, setCurrentTrainingPlan] = useState(null);

    useEffect(() => {
        fetchRunners();
    }, []);

    const fetchRunners = async () => {
        try {
            const data = await httpService.get('/runners/index');
            setRunners(data);
        } catch (error) {
            console.error('Error al obtener los corredores:', error);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            const data = await httpService.post('/training_plans/', { ...formData, user_id: selectedRunnerId })
            setCurrentTrainingPlan(data);
            fetchRunners(); // Recargar la lista de corredores
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCreatePlanClick = (runnerId) => {
        setSelectedRunnerId(runnerId);
        setShowModal(true);
    };

    const handleViewTrainingPlanClick = async (trainingPlanId) => {
        try {
            const data = await httpService.get(`/training_plans/${trainingPlanId}`);
            setCurrentTrainingPlan(data);
            setShowTrainingPlanModal(true);
            setShowModal(false)
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
                                    {runner.current_training_plan && (
                                        <button className="btn btn-warning text-white mx-2 my-1" onClick={() => handleViewTrainingPlanClick(runner.current_training_plan.id)}>
                                            Ver plan
                                        </button>
                                    )}
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
                handleViewTrainingPlanClick={handleViewTrainingPlanClick}
            />
            {showTrainingPlanModal && (
                <TrainingPlanModal 
                    show={showTrainingPlanModal} 
                    handleClose={() => setShowTrainingPlanModal(false)}
                    trainingPlan={currentTrainingPlan}
                />
            )}
        </div>
    );
};

export default Runners;
