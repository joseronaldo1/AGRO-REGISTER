import React from 'react';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai'; // Importamos el icono de cierre

const ModalOjo = ({ mostrar, cerrarModal, titulo, initialData }) => {
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semi-transparente
      position: 'fixed', // Posición fija
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999 // Z-index alto para asegurarse de que esté por encima de todo
    },
    content: {
      width: '50%', // Ancho del modal
      margin: 'auto', // Centrar horizontalmente
      maxHeight: '70%', // Altura máxima del modal
      overflowY: 'auto', // Habilitar desplazamiento vertical si el contenido es demasiado largo
      borderRadius: '10px', // Bordes redondeados
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Sombra
      padding: '20px', // Espaciado interno
      backgroundColor: '#fff', // Fondo blanco
      outline: 'none', // Eliminar el contorno del modal
      position: 'relative' // Establecemos la posición relativa para el icono de cierre
    },
    closeButton: {
      position: 'absolute', // Posición absoluta para el botón de cierre
      top: '10px', // Distancia superior
      right: '10px', // Distancia derecha
      cursor: 'pointer', // Cambiar el cursor al pasar sobre el botón
      fontSize: '30px', // Tamaño del icono
      color: '#888', // Color del icono
      padding: '5px', // Espaciado interno
      borderRadius: '50%', // Bordes redondeados
      zIndex: 999 // Z-index alto para asegurarse de que esté por encima del contenido del modal
    }
  };

  return (
    <Modal
      isOpen={mostrar}
      onRequestClose={cerrarModal}
      contentLabel={titulo}
      ariaHideApp={false}
      style={customStyles}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h2>{titulo}</h2>
        <AiOutlineClose
          style={customStyles.closeButton}
          onClick={cerrarModal}
        />
        <AiOutlineClose
  style={{ ...customStyles.closeButton, fontSize: '30px' }}
  onClick={cerrarModal}
  onMouseEnter={(e) => e.target.style.color = '#000'}
  onMouseLeave={(e) => e.target.style.color = '#888'}
/>

      </div>
  
      <div>
        <p><strong>Nombre de la Actividad:</strong> {initialData && initialData.nombre_actividad}</p>
        <p><strong>Tiempo:</strong> {initialData && initialData.tiempo}</p>
        <p><strong>Observaciones:</strong> {initialData && initialData.observaciones}</p>
        <p><strong>Valor de la Actividad:</strong> {initialData && initialData.valor_actividad}</p>
        <p><strong>Finca:</strong> {initialData && initialData.nombre_finca}</p>
        <p><strong>Lote:</strong> {initialData && initialData.nombre}</p>
        <p><strong>Tipo de Recurso:</strong> {initialData && initialData.nombre_recursos}</p>
      </div>
    </Modal>
  );
};

export default ModalOjo;
