import React, { useState } from 'react';
import Formulario from '../components/organismos/Formulario.jsx';
import Botones from '../components/atomos/Botones.jsx';
import axios from 'axios';

export const Registro = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        password: '',
        rol: '',
        estado: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/registrarUsuario', formData);
            console.log(response.data);
            // Limpiar el formulario después de enviar los datos
            setFormData({
                nombre: '',
                apellido: '',
                correo: '',
                password: '',
                rol: '',
                estado: ''
            });
            // Mostrar mensaje de éxito
            alert('Registro exitoso: ' + JSON.stringify(response.data));
        } catch (error) {
            // Mostrar errores del servidor API y errores de código
            setError(error.response.data.errors[0].msg || 'Error desconocido');
            alert('Error al registrar: ' + (error.response.data.errors[0].msg || 'Error desconocido'));
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const campos = [
        { name: 'nombre', type: 'text', placeholder: 'Nombre' },
        { name: 'apellido', type: 'text', placeholder: 'Apellido' },
        { name: 'correo', type: 'email', placeholder: 'Correo Electrónico' },
        { name: 'password', type: 'password', placeholder: 'Contraseña' },
        { name: 'rol', type: 'text', placeholder: 'Rol' },
        { name: 'estado', type: 'text', placeholder: 'Estado' }
    ];

    return (
        <div>
            <h2>Formulario de Registro</h2>
            <Formulario campos={campos} onSubmit={handleSubmit}>
                <Botones type="submit">Registrarse</Botones>
            </Formulario>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
}

export default Registro;
