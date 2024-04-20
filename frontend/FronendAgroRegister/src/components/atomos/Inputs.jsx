// InputAtom.js
import React from 'react';

const InputAtom = ({ label, id, name, type, value, onChange,placeholder,className,disabled}) => {
    return (
        <div>
          <label htmlFor={id}>{label}</label>
          <input type={type || "text"} id={id} name={name} value={value} onChange={onChange} placeholder={placeholder}disabled={disabled}
          className={className}
          
      style={ {  width:'320px', height:'31px' , borderColor: '#1bc12e', borderRadius: '6px',}}/>
        </div>
      );
};

export default InputAtom;
