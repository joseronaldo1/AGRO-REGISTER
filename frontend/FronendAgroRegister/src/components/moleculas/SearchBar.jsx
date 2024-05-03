// En el componente SearchBar
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      // Si el término de búsqueda está vacío, mostrar todas las fincas
      onSearch('');
    } else {
      // Si hay un término de búsqueda, realizar la búsqueda normalmente
      onSearch(searchTerm);
    }
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
