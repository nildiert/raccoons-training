import { useState,useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import WorkingDay from "./WorkingDay";
import CongratulationsModal from './CongratulationsModal';

import { httpService } from "../../services/httpService";




Modal.setAppElement('#root');
const ActiveWeek=({currUser})=>{
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [activeWeek, setActiveWeek]=useState(null);
    const [workingDayDetails, setWorkingDayDetails] = useState(null);
    const [showCongratsModal, setShowCongratsModal] = useState(false);

    const openModal = async (workingDayId) => {
        try {
            const data = await httpService.get(`/working_days/${workingDayId}`);
            setWorkingDayDetails(data);
            setModalIsOpen(true);
        } catch (error) {
            console.log("error", error);
        }
    };

    const markAsCompleted = async (workingDayId, isCompleted) => {
        try {
            await httpService.put(`/working_days/${workingDayId}`, { completed: !isCompleted });
            if (!isCompleted) {
                setShowCongratsModal(true);
            }
            setModalIsOpen(false);
            getData();
        } catch (error) {
            console.log("error", error);
        }
    };


    const getData = async () => {
        try {
            const data = await httpService.get(`/training_plans/active`);
            setActiveWeek(data);
        }
        catch(error){
            console.log("error", error)
            setActiveWeek(null)
        }
    }
    useEffect(() => {
        if (currUser) getData();
    }, [currUser]);

    const getColorClass = (kind, completed) => {
        const baseClass = completed ? 'bg-' : 'border border-2 border-';
        switch (kind) {
            case 'workout': return baseClass + 'info';
            case 'intensity': return baseClass + 'warning';
            case 'easy_run': return baseClass + 'success';
            case 'long_run': return baseClass + 'primary text-white';
            case 'rest': return baseClass + 'secondary';
        }
    };

    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { weekday: 'long' });
    };
return (
        <div>
            {activeWeek ? (
                <div>
                    <div className="card my-3">
                        <div className="card-header">
                            <h2>Training Plan: {activeWeek.training_plan.name}</h2>
                        </div>
                        <div className="card-body">
                            <h3 className="card-title">Week {activeWeek.number} - {activeWeek.kind}</h3>
                            {activeWeek.working_days.map(day => (
                                <div key={day.id} className={`card mb-3 ${getColorClass(day.kind, day.completed)}`} onClick={() => openModal(day.id)}>
                                    <div className="card-body">
                                        <h5 className="card-title d-flex justify-content-between align-items-center">
                                            {getDayOfWeek(day.date)} - {day.date}
                                            <FontAwesomeIcon icon={day.completed ? faCheck : faTimes} className="ms-2" />
                                        </h5>
                                        <p className="card-text">
                                            <FontAwesomeIcon icon={faClock} className="me-2" />Duration: {day.duration} mins
                                            <br />
                                            {day.kind}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Working Day Details"
            >
                <button onClick={() => setModalIsOpen(false)} className="close-modal">X</button>
                <WorkingDay details={workingDayDetails} />
                {workingDayDetails && (
                    <button className="btn btn-primary" onClick={() => markAsCompleted(workingDayDetails.id, workingDayDetails.completed)}>
                        {workingDayDetails.completed ? "No he terminado mi entrenamiento" : "He terminado mi entrenamiento"}
                    </button>
                )}
            </Modal>
            <CongratulationsModal
                isOpen={showCongratsModal}
                onClose={() => setShowCongratsModal(false)}
            />
        </div>
    );
};

export default ActiveWeek;