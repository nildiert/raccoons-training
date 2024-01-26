import { useState,useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import WorkingDay from "./WorkingDay";
import CongratulationsModal from './CongratulationsModal';




Modal.setAppElement('#root');
const ActiveWeek=({currUser})=>{
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [activeWeek, setActiveWeek]=useState(null);
    const [workingDayDetails, setWorkingDayDetails] = useState(null);
    const [showCongratsModal, setShowCongratsModal] = useState(false);



    const openModal = async (workingDayId) => {
        // Aquí realizas la consulta a la API para obtener los detalles
        try {
            const response = await fetch(`http://localhost:3000/working_days/${workingDayId}`, {
                method: "get",
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token")
                }
            });
            if (!response.ok) throw Error;
            const data = await response.json();
            setWorkingDayDetails(data);
            setModalIsOpen(true);
        } catch (error) {
            console.log("error", error);
        }
    };

    const markAsCompleted = async (workingDayId, isCompleted) => {
        const url = `http://localhost:3000/working_days/${workingDayId}`;
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                },
                body: JSON.stringify({ completed: !isCompleted }) // Invierte el estado actual
            });
            if (!response.ok) throw new Error('Error al actualizar');
            
            // Actualiza el estado o realiza cualquier otra acción necesaria después de la actualización
            if (!isCompleted) {
                setShowCongratsModal(true); // Muestra el modal de felicitaciones si se completa
            }
            setModalIsOpen(false); // Cierra el modal de detalles del día de entrenamiento
            getData(); // Actualiza los datos del plan de entrenamiento
        } catch (error) {
            console.error("Error al actualizar el día de entrenamiento", error);
        }
    };


    const getData=async ()=>{
        try {
            const response=await fetch("http://localhost:3000/training_plans/active", {
                method: "get",
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token")
                }
            })
            if(!response.ok) throw Error
            const data=await response.json()
            setActiveWeek(data)
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
                    <h2>Training Plan: {activeWeek.training_plan.name}</h2>
                    <h3>Week {activeWeek.number} - {activeWeek.kind}</h3>
                    {activeWeek.working_days.map(day => (
                        <div key={day.id} className={`card mb-3 ${getColorClass(day.kind, day.completed)}`} onClick={() => openModal(day.id)}>
                            <div className="card-body">
                                <h5 className="card-title">
                                    {getDayOfWeek(day.date)} - {day.date}
                                    <FontAwesomeIcon icon={day.completed ? faCheck : faTimes} className="ms-2" />
                                </h5>
                                <p className="card-text">
                                    <FontAwesomeIcon icon={faClock} /> Duration: {day.duration} mins
                                    <br />
                                    {day.kind}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>Loading ...</div>
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