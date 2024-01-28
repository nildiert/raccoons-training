import React from 'react';
import { Modal, Accordion } from 'react-bootstrap';

const TrainingPlanModal = ({ show, handleClose, trainingPlan }) => {
    console.log(trainingPlan);
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{trainingPlan?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Accordion defaultActiveKey="0">
                    {trainingPlan?.training_weeks?.map((week, index) => (
                        <Accordion.Item eventKey={index.toString()} key={index}>
                            <Accordion.Header>Semana {week.number}</Accordion.Header>
                            <Accordion.Body>
                                {/* Aquí puedes agregar más detalles de cada semana */}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Modal.Body>
            <Modal.Footer>
                {/* Botones o acciones adicionales si son necesarios */}
            </Modal.Footer>
        </Modal>
    );
};

export default TrainingPlanModal;
