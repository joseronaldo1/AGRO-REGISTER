import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Formulariofinca = ({ onSubmit, className, initialData, mode, cerrarModal }) => {
    const initialFormData = {
        nombre: initialData && initialData.nombre ? initialData.nombre : '',
        apellido: initialData && initialData.apellido ? initialData.apellido : '',
        correo: initialData && initialData.correo ? initialData.correo : '',
        password: initialData && initialData.password ? initialData.password : '',
        rol: initialData && initialData.rol ? initialData.rol : ''
    };


    const [formData, setFormData] = useState(initialFormData);
    const [showWarning, setShowWarning] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const validarNombres = nombre => {
        const soloLetras = /^[a-zA-Z\s]*$/;
        return soloLetras.test(nombre);
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!formData.nombre || !formData.apellido || !formData.correo || !formData.password || !formData.rol) {
                setShowWarning(true);
                return;
            }
            if (!validarNombres(formData.nombre, formData.apellido)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El nombre o el apellido solo puede contener letras'
                });
                return;
            }
    
            if (mode === 'registro') {
                const response = await axios.post(
                    'http://localhost:3000/registrarUsuario',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log(response.data);
    
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'El empleado se ha registrado exitosamente'
                });
                console.log(response.data);
            } else if (mode === 'update') {
                const { id } = initialData; // Asegúrate de que el ID esté correctamente definido aquí
                await axios.put(
                    `http://localhost:3000/actualizarEmpleado/${id}`,
                    formData
                );
    
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'El empleado se ha actualizado exitosamente'
                });
            }
    
            onSubmit(formData);
            cerrarModal();
        } catch (error) {
            console.error('Error al procesar el formulario:', error);
        }
    };
    


    return (
        <form
            className={className}
            onSubmit={handleFormSubmit}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            }}
        >
            {showWarning && (
                <p style={{ color: 'red', marginBottom: '10px' }}>
                    Por favor complete todos los campos
                </p>
            )}
            <div className="flex flex-col">
                <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
                    Nombres:{' '}
                </label>
                <br />
                <input
                    style={{
                        borderColor: '#1bc12e',
                        borderRadius: '6px',
                        width: '50%',
                        height: '40px'
                    }}
                    type="text"
                    name="nombre"
                    placeholder="Nombre del empleado"
                    value={formData.nombre}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col">
                <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
                    Apellidos:{' '}
                </label>
                <br />
                <input
                    style={{
                        borderColor: '#1bc12e',
                        borderRadius: '6px',
                        width: '50%',
                        height: '40px'
                    }}
                    type="text"
                    name="apellido"
                    placeholder="Apellido del empleado"
                    value={formData.apellido}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col">
                <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
                    Correo:{' '}
                </label>
                <br />
                <input
                    style={{
                        borderColor: '#1bc12e',
                        borderRadius: '6px',
                        width: '50%',
                        height: '40px'
                    }}
                    type="text"
                    name="correo"
                    placeholder="correo"
                    value={formData.correo}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col">
                <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
                    Contraseña:{' '}
                </label>
                <br />
                <input
                    style={{
                        borderColor: '#1bc12e',
                        borderRadius: '6px',
                        width: '50%',
                        height: '40px'
                    }}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col">
                <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
                    Rol:{' '}
                </label>
                <br />
                <select
                    style={{
                        borderColor: '#1bc12e',
                        borderRadius: '6px',
                        width: '50%',
                        height: '40px'
                    }}
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                >
                    <option value="">Seleccione...</option>
                    <option value="empleado">empleado</option>
                </select>
            </div>
            <button
                className="boton"
                type="submit"
                style={{
                    backgroundColor: 'green',
                    borderRadius: '10px',
                    color: 'white',
                    border: 'none',
                    marginLeft: '3%',
                    width: '20%',
                    fontSize: '17px',
                    marginTop: '20px',
                    height: '40px'
                }}
            >
                {mode === 'registro' ? 'Registrar' : 'Actualizar'}
            </button>
        </form>
    );
};

export default Formulariofinca;
