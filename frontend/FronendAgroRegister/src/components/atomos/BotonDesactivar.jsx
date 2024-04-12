import React from 'react';

export const ButtonDesactivar = (props) => {
  return (
    <button className='btn btn-danger btn-sm fw-bold'onClick={props.click}>Desactivar</button>
  );
};