import React, { useState, useEffect } from 'react';
import { faRunning } from '@fortawesome/free-solid-svg-icons';
import { Modal, Accordion, Form, Button } from 'react-bootstrap';
import { httpService } from '../../services/httpService';

const kindOptions = {
    rest: 'Descanso',
    hard: 'Intensidad',
    accumulative: 'Acumulativa'
};

const kindDayOptions = {
    rest: 'Descanso',
    easy_run: 'Día fácil',
    workout: 'Fortalecimiento',
    long_run: 'Salida larga',
    intensity: 'Intensidad'
};


const formatDate = (dateString) => {
    // Crear un objeto Date en UTC
    const date = new Date(dateString + 'T00:00:00Z');

    // Opciones para formatear la fecha
    const options = {
        weekday: 'short', // Abreviatura del día de la semana
        day: 'numeric', // Día del mes
        month: 'short', // Abreviatura del mes
        timeZone: 'UTC' // Usar UTC para evitar discrepancias de zona horaria
    };

    // Formatear la fecha según las opciones y el idioma local
    return date.toLocaleDateString('es', options);
};

const TrainingPlanModal = ({ show, handleClose, trainingPlan }) => {

    const [dayFormData, setDayFormData] = useState({});
    const handleDayFormDataChange = (dayId, field, value) => {
        setDayFormData({
            ...dayFormData,
            [dayId]: { ...dayFormData[dayId], [field]: value }
        });
    };

    useEffect(() => {
        // Inicializar dayFormData con los valores actuales de los días
        const initialDayFormData = {};
        trainingPlan?.training_weeks.forEach(week => {
            week.working_days.forEach(day => {
                initialDayFormData[day.id] = { kind: day.kind, duration: day.duration, description: day.description };
            });
        });
        setDayFormData(initialDayFormData);
    }, [trainingPlan]);


    const updateTrainingWeekKind = async (weekId, newKind) => {
        try {
            await httpService.put(`/training_weeks/${weekId}`, { kind: newKind});
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const handleKindChange = (weekId, newKind) => {
        updateTrainingWeekKind(weekId, newKind);
    };

    const handleDayChange = async (dayId) => {
        try {
            const updatedDay = dayFormData[dayId];
            // Verificar si updatedDay tiene los datos necesarios
            if (!updatedDay || !updatedDay.kind || !updatedDay.duration) {
                console.error('Información del día no actualizada o incompleta');
                return;
            }
            await httpService.put(`/working_days/${dayId}`, updatedDay);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{trainingPlan?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Accordion defaultActiveKey="0">
                    {trainingPlan?.training_weeks?.map((week, weekIndex) => (
                        <Accordion.Item eventKey={weekIndex.toString()} key={week.id}>
                            <Accordion.Header>Semana {week.number}</Accordion.Header>
                            <Accordion.Body>
                                <Form.Group>
                                        <Form.Label>Tipo de Semana</Form.Label>
                                        <Form.Select 
                                            defaultValue={week.kind} 
                                            onChange={(e) => handleKindChange(week.id, e.target.value)}
                                            className="mb-4"
                                        >
                                            {Object.entries(kindOptions).map(([key, value]) => (
                                                <option key={key} value={key}>{value}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Accordion>
                                        {week.working_days?.map((day, dayIndex) => (
                                            <Accordion.Item eventKey={dayIndex.toString()} key={day.id}>
                                                <Accordion.Header>
                                                    {formatDate(day.date)}
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <Form>
                                                        <Form.Group>
                                                            <Form.Label>Tipo de Día</Form.Label>
                                                            <Form.Select 
                                                                value={dayFormData[day.id]?.kind || day.kind}
                                                                onChange={(e) => handleDayFormDataChange(day.id, 'kind', e.target.value)}
                                                            >
                                                            {Object.entries(kindDayOptions).map(([key, value]) => (
                                                                <option key={key} value={key}>{value}</option>
                                                            ))}
                                                            </Form.Select>
                                                        </Form.Group>
                                                        <Form.Group>
                                                            <Form.Label>Duración</Form.Label>
                                                            <Form.Control 
                                                                type="number" 
                                                                defaultValue={day.duration}
                                                                onChange={(e) => handleDayFormDataChange(day.id, 'duration', e.target.value)}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group>
                                                            <Form.Label>Descripción</Form.Label>
                                                            <Form.Control 
                                                                type="text" 
                                                                defaultValue={day.description}
                                                                onChange={(e) => handleDayFormDataChange(day.id, 'description', e.target.value)}
                                                            />
                                                        </Form.Group>
                                                        <Button 
                                                            variant="primary" 
                                                            className="w-100 mt-3"
                                                            onClick={() => handleDayChange(day.id, { 
                                                                kind: day.kind, 
                                                                duration: day.duration,
                                                                description: day.description
                                                            })}
                                                        >
                                                            Guardar
                                                        </Button>
                                                    </Form>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        ))}
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Modal.Body>
            <Modal.Footer>
                <React.Fragment>
                    <Button variant="primary" onClick={handleClose}>
                    Cerrar
                    </Button>
                </React.Fragment>
            </Modal.Footer>
        </Modal>
    );
};

export default TrainingPlanModal;
