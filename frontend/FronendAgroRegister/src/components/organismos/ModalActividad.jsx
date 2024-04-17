import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import FormularioActividad from '../organismos/FormActividad';

function ModalActividad({ titulo, mostrar, cerrarModal, handleSubmit, actionLabel, initialData, mode }) {
  useEffect(() => {
    if (!mostrar) {
      cerrarModal(); // Close the modal when mostrar changes to false
    }
  }, [mostrar, cerrarModal]);

  return (
    <Modal show={mostrar} onHide={cerrarModal}>
      <Modal.Header closeButton>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {mostrar && (
          <FormularioActividad
            onSubmit={(data) => {
              handleSubmit(data);
              cerrarModal(); // Call cerrarModal after form submission
            }}
            initialData={initialData}
            mode={mode}
            cerrarModal={cerrarModal} 
          />
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ModalActividad;