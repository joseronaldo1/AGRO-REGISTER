import { Router } from "express";
import { actualizarUsuario, listarUsuarios, buscarUsuario, desactivarUsuario, registrarUsuario, cargarImagen } from '../controllers/controller.usuarios.js';
import { validarUsuario, validarUsu } from '../../validate/UsuariosValidatekvd.js';
//import { validarToken } from '../controllers/autenticacion.js'

const rutaUsuario = Router();

rutaUsuario.get('/listarUsuario', listarUsuarios);
rutaUsuario.get('/buscarUsuarios/:id_usuario', buscarUsuario);

// Para registrar usuario con validación y carga de imagen
rutaUsuario.post('/registrarUsuario', cargarImagen, validarUsuario, registrarUsuario);

// Para actualizar usuario con validación y carga de imagen
rutaUsuario.put('/actualizarUsuario/:id_usuario', cargarImagen, validarUsu, actualizarUsuario);

// Para desactivar usuario
rutaUsuario.post('/desactivarUsuario/:id_usuario', desactivarUsuario);

export default rutaUsuario;
