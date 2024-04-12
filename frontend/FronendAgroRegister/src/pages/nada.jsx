import React, { useState } from 'react';
import axios from 'axios'; // Importa Axios

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        nombre_recursos: '',
        cantidad_medida: '',
        unidades_medida: '',
        extras: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/RegistroRecurso', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data); // Manejar la respuesta según necesites
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="formulario-container">
                <h2 className="Titulo">Registrarse</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="nombre_recursos"
                        placeholder="Nombre de Recursos"
                        value={formData.nombre_recursos}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="cantidad_medida"
                        placeholder="Cantidad de Medida"
                        value={formData.cantidad_medida}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="unidades_medida"
                        placeholder="Unidades de Medida"
                        value={formData.unidades_medida}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="extras"
                        placeholder="Extras"
                        value={formData.extras}
                        onChange={handleChange}
                    />
                    
                    <button className="boton" type="submit">Registrarse</button>
                </form>
            </div>
            
        </div>
    );
}

export default Login;
