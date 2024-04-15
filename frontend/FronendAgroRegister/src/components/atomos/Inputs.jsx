// InputAtom.js
import React from 'react';

const InputAtom = ({ label, id, name, type, value, onChange }) => {
    return (
        <div>
          <label htmlFor={id}>{label}</label>
          <input type={type || "text"} id={id} name={name} value={value} onChange={onChange}
          className=" rounded px-2  mb-4 border border-success"
      style={{  width:'350px', height:'40 px' }}/>
        </div>
      );
};

export default InputAtom;
