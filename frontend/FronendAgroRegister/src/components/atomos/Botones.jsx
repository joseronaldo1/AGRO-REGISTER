// ButtonAtom.js
import React from 'react';
import { Button } from 'react-bootstrap';

const Botones = ({ onClick, children, className, variant }) => {
  return (
    <Button className={className} variant={variant} onClick={onClick} style={{ width: '90px', height: '40px', background: '#1bc12e', marginLeft: '80px', borderColor: "#1bc12e" }}>
      {children}
    </Button>
  );
};

export default Botones;
