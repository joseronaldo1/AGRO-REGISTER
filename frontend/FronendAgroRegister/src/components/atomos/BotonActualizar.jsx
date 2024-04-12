import React from 'react';

export const ButtonActualizar = (props) => {
  return (
    <button className='btn btn-warning  btn-sm fw-bold mr-4 text-white' onClick={props.click}>Actualizar</button>
  );
};