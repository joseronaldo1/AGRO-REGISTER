import React from 'react';
import { Button } from 'react-bootstrap';

function BotonesModal({ variant, onClick, children, className }) {
  return (
    <div>
      <Button className={className} variant={variant} onClick={onClick} style={{width: '90px', height: '40px'}}>
        {children}
      </Button>
    </div>
  );
}

export default BotonesModal;
