import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importa el ícono de búsqueda de FontAwesome

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
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Buscar por Nombre"
          style={{
            borderRadius: '20px',
            paddingLeft: '40px', // Agregar espacio para el ícono de búsqueda
            paddingRight: '10px', // Agregar espacio para el botón de búsqueda
            height: '35px',
            border: 'none',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 2.0)', // Agregar una sombra suave
          }}
          value={searchTerm}
          onChange={handleChange}
        />
        <FaSearch
          style={{
            position: 'absolute',
            top: '50%',
            left: '10px', // Posiciona el ícono a la izquierda del input
            transform: 'translateY(-50%)', // Centra verticalmente el ícono
            color: '#ccc', // Color del ícono de búsqueda
            zIndex: '1', // Asegura que el ícono esté sobre el input
          }}
        />
      </div>
    </form>
  );
};

export default SearchBar;
