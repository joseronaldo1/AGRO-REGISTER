import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import SearchBar from '../moleculas/SearchBar';
import Footer from '../organismos/Footer/Footer';
import Header2 from "../organismos/Header/Header2.jsx";

function Actividad2() {


  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [error, setError] = useState(null);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('');

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const baseURL = 'http://localhost:3000/listarActividad';
      const respuesta = await axios.get(baseURL, {
        headers: {
          'token': token
        }
      });
      setData(respuesta.data);
      setOriginalData(respuesta.data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Manejar el caso en que el token no esté presente
        console.error('No se encontró el token en el localStorage');
        return;
      }
  
      if (searchTerm.trim() === '') {
        setData(originalData);
        setError(null);
      } else {
        const response = await axios.get(`http://localhost:3000/Buscaractividad/${searchTerm}`, {
          headers: {
            'token': token
          }
        });
        setData(response.data);
        if (response.data.length === 0) {
          setError('No se encontraron resultados');
        } else {
          setError(null);
        }
      }
    } catch (error) {
      console.error('Error searching for resources:', error);
      setError('Busqueda no encontrada');
    }
  };

  const handleEstadoSeleccionado = (event) => {
    setEstadoSeleccionado(event.target.value);
    if (event.target.value === '') {
      setData(originalData);
    } else {
      const filteredData = originalData.filter(item => item.estado === event.target.value);
      setData(filteredData);
    }
  };

  const handleTerminarActividad = async (id) => {
    try {
      await axios.put(`http://localhost:3000/ActualizarEstadoActividad/${id}`, { estado: 'terminado' });
      fetchData();
    } catch (error) {
      console.error('Error al terminar la actividad:', error);
    }
  };

  return (
    <div className="recursos-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', marginTop: "90px" }}>
      <Header2 />
      <div className="main-content" style={{ flex: 1 }}>
        <div className="container mt-5">
          <SearchBar onSearch={handleSearch} />
          <select
            className="form-select mb-3"
            value={estadoSeleccionado}
            onChange={handleEstadoSeleccionado}
            style={{ fontWeight: '600',width: '180px', backgroundColor: '#E4E4E4', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)', cursor: 'pointer' }}
          >
            <option value="">Estados</option>
            <option value="activo">Activo</option>
            <option value="ejecutandose">Ejecutandose</option>
            <option value="inactivo">Inactivo</option>
            <option value="terminado">Terminado</option>
          </select>

          {error ? (
            <p className="text-danger text-center">{error}</p>
          ) : (
            <div className="row">
              {data.map((actividad) => (
                <div key={actividad.id_actividad} className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '15px' }}>
                    <div className="card-body" style={{boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)', borderRadius: '10px'}}>
                      <h4 style={{ textAlign: 'center' }}>Actividad a realizar: </h4>
                      <br />
                      <p className="card-text"><strong>Actividad:</strong>{actividad.nombre_actividad}</p>
                      <p className="card-text"><strong>Variedad:</strong> {actividad.nombre_variedad}</p>
                      <p className="card-text"><strong>Tiempo:</strong> {actividad.tiempo}</p>
                      <p className="card-text"><strong>Observaciones:</strong> {actividad.observaciones}</p>
                      <p className="card-text"><strong>Valor 2:</strong> {actividad.valor_actividad}</p>
                      <p className="card-text">
                        <strong>Estado:</strong>
                        <span className={`badge ${actividad.estado === 'activo' ? 'bg-success' :
                          actividad.estado === 'ejecutandose' ? 'bg-warning text-dark' :
                            actividad.estado === 'terminado' ? 'bg-primary' :
                              'bg-danger'}`}>
                          {actividad.estado}
                        </span>
                      </p>
                      {/* {actividad.estado !== 'terminado' && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                          <Button style={{ marginLeft: '180px',backgroundColor: 'green', border: 'none' }} variant="primary" className="me-2" onClick={() => console.log(`Actividad ${actividad.id_actividad} aceptada`)}>Aceptar</Button>
                          <Button style={{ backgroundColor: '#4047EA', border: 'none' }} variant="primary" className="me-2" onClick={() => handleTerminarActividad(actividad.id_actividad)}>Terminar</Button>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <br />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Actividad2;
