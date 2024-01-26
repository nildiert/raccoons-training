// CongratulationsModal.js
import React, { useEffect } from 'react';
import Modal from 'react-modal';
import confetti from 'canvas-confetti';

const CongratulationsModal = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            confetti();
            const timer = setTimeout(onClose, 2000); // Cierra el modal después de 2 segundos
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={{
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                width: '50%', // Ajusta el ancho aquí
                maxWidth: '500px', // Máximo ancho si lo necesitas
            }
        }}>
            <h2>¡Felicitaciones!</h2>
            <p>Has completado tu entrenamiento.</p>
        </Modal>
    );
};

export default CongratulationsModal;
