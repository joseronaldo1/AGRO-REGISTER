// En el componente SearchBar
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} style={{marginLeft: '75%'}}>
      <input
        type="text"
        placeholder="Buscar por ID"
        style={{ borderRadius: '6px'}}
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit" style={{backgroundColor: '#ffc107', 
      color:'black', border: 'none', borderRadius: '6px',height: '35px' 
      ,width: '25%',fontSize: '17px'}}>Buscar</button>
    </form>
  );
};

export default SearchBar;
