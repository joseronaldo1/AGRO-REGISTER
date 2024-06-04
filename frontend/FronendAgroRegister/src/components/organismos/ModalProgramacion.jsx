import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Formulariolote from '../organismos/FormProgramacion';

function ModalRecuRegeContrasenia({ titulo, mostrar, cerrarModal, handleSubmit, actionLabel, initialData, mode }) {
  useEffect(() => {
    if (!mostrar) {
      cerrarModal(); // Cierra el modal cuando mostrar cambia a false
    }
  }, [mostrar, cerrarModal]);

  return (
    <Modal show={mostrar} onHide={cerrarModal}>
      <Modal.Header closeButton>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {mostrar && ( // Asegura que el contenido se renderice solo cuando mostrar es true
          <Formulariolote
            onSubmit={(data, e) => {
              handleSubmit(data, e);
              cerrarModal(); // Cierra el modal después de enviar el formulario
            }}
            initialData={initialData} // Aseguramos que el initialData se pase correctamente
            mode={mode} // Pasamos el modo (registro o update)
            cerrarModal={cerrarModal} // Pasamos la función cerrarModal
          />
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ModalRecuRegeContrasenia;
