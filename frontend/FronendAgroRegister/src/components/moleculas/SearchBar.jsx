import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    // Llamar a la función de búsqueda con el término actualizado
    onSearch(value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginLeft: '75%', marginTop: '12px' }}>
      <input
        type="text"
        placeholder="Buscar por Nombre"
        style={{ borderRadius: '6px' }}
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit" style={{
        backgroundColor: '#975C29',
        color: 'white', border: 'none', borderRadius: '6px', height: '35px'
        , width: '25%', fontSize: '17px'
      }}>Buscar</button>
    </form>
  );
};

export default SearchBar;
