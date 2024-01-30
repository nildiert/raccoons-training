import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';

const CreateTrainingPlanModal = ({ show, handleClose, handleSubmit, handleViewTrainingPlanClick }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    number_of_weeks: '',
    start_date: ''
  });

  const [planCreated, setPlanCreated] = useState(false);
  const [createdPlanId, setCreatedPlanId] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para el loader

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
        setIsLoading(true)
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      } else {
        console.error('No se pudo crear el plan de entrenamiento');
        setIsLoading(false);
        setPlanCreated(false);
      }
    } catch (error) {
      console.error('Error al crear el plan de entrenamiento:', error);
      setIsLoading(false);
      setPlanCreated(false);
    }
  };


  return (
    <Modal show={show} onHide={handleClose} size="lg">
    <Modal.Header closeButton>
        <Modal.Title>Crear Plan de Entrenamiento</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    {isLoading ? (
                    <div className="text-center">
                        <Spinner animation="border" />
                        <p>Creando plan de entrenamiento...</p>
                    </div>
                ) : (
                    <div>
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
                    </div>
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
        {planCreated && !isLoading && (
        <Button 
          variant="outline-success" 
          onClick={() => handleViewTrainingPlanClick(createdPlanId)}
        >
          Ver Plan
        </Button>
      )}
    </Modal.Footer>
    </Modal>

  );
};

export default CreateTrainingPlanModal;
