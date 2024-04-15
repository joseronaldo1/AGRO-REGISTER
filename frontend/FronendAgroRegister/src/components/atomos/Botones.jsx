// ButtonAtom.js
import React from 'react';
import { Button } from 'react-bootstrap';

const Botones = ({ type, children }) => {
  return (
    <Button type={type} style={{ width: '90px', height: '40px', background: '#1bc12e', marginLeft: '80px', borderColor: "#1bc12e" }}>
      {children}
    </Button>
  );
};

export default Botones;
