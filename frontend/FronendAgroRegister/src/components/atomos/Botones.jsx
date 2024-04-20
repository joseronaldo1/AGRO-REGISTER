import React from 'react';
import { Button } from 'react-bootstrap';

const Botones = ({ type, children, onClick, style,className,disabled}) => {
  return (
    <Button type={type} style={style || { width: '90px', height: '40px', background: '#1bc12e', marginLeft: '80px', borderColor: "#1bc12e" }} onClick={onClick} className={className} disabled={disabled}>
      {children}
    </Button>
  );
};

export default Botones;
