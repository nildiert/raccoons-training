import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const CreateTrainingPlanModal = ({ show, handleClose, handleSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    number_of_weeks: '',
    start_date: ''
  });

  const [planCreated, setPlanCreated] = useState(false);
  const [createdPlanId, setCreatedPlanId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdPlan = await handleSubmit(formData);
      if (createdPlan && createdPlan.id) {  // Verificar si el plan creado tiene una propiedad 'id'
        setCreatedPlanId(createdPlan.id);
        setPlanCreated(true);
      } else {
        console.error('No se pudo crear el plan de entrenamiento');
        setPlanCreated(false);
      }
    } catch (error) {
      console.error('Error al crear el plan de entrenamiento:', error);
      setPlanCreated(false);
    }
  };


  return (
    <Modal show={show} onHide={handleClose} size="lg">
    <Modal.Header closeButton>
        <Modal.Title>Crear Plan de Entrenamiento</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {planCreated ? (
        <Alert variant="success">
            <p>Se ha creado el entrenamiento.</p>
            <div className="d-flex justify-content-end">
            {/* Botones u otros elementos si son necesarios */}
            </div>
        </Alert>
        ) : (
        <Form>
            <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-100" 
            />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control 
                type="text" 
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-100"
            />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Número de Semanas</Form.Label>
            <Form.Control 
                type="number" 
                name="number_of_weeks"
                value={formData.number_of_weeks}
                onChange={handleChange}
                className="w-100" 
            />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Fecha de Inicio</Form.Label>
            <Form.Control 
                type="date" 
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-100" 
            />
            </Form.Group>
        </Form>
        )}
    </Modal.Body>
    <Modal.Footer className="d-flex justify-content-between">
        {!planCreated && (
        <React.Fragment>
            <Button variant="secondary" onClick={handleClose}>
            Cerrar
            </Button>
            <Button variant="primary" onClick={handleFormSubmit}>
            Crear
            </Button>
        </React.Fragment>
        )}
    </Modal.Footer>
    </Modal>

  );
};

export default CreateTrainingPlanModal;
