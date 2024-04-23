import React from 'react';
import { Button } from 'react-bootstrap';

const BotonBuscar = ({ onClick, children }) => {
  return (
    <Button
      style={{
        backgroundColor: '#ffc107',
        color: 'black',
        borderColor: '#ffc107',
        borderRadius: '6px',
        marginLeft: '-10px', // Aplicamos el mismo margen que el botón "Editar"
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default BotonBuscar;
