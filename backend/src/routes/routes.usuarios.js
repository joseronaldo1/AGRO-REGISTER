import { Router } from "express";
import { actualizarUsuario, listarUsuarios, buscarUsuario, desactivarUsuario, registrarUsuario, cargarImagen } from '../controllers/controller.usuarios.js';
import { validarUsuario, validarUsu } from '../../validate/UsuariosValidatekvd.js';
import { Router } from "express"
import { actualizarUsuario, listarUsuarios, buscarUsuario, DesactivarUsuario, registrarUsuario, cargarImagen, desactivarUsuarioEnCadena } from '../controllers/controller.usuarios.js'
import { validarUsuario, validarUsu } from '../../validate/UsuariosValidatekvd.js'
//import { validarToken } from '../controllers/autenticacion.js'

const rutaUsuario = Router();

rutaUsuario.get('/listarUsuario', listarUsuarios);
rutaUsuario.get('/buscarUsuarios/:id_usuario', buscarUsuario);
rutaUsuario.get('/listarUsuario', listarUsuarios);
rutaUsuario.post('/registrarUsuario', validarUsuario, registrarUsuario, cargarImagen);
rutaUsuario.put('/actualizarUsuario/:id', validarUsu, actualizarUsuario, cargarImagen);
rutaUsuario.put("/desactivar/Usuario/:id", DesactivarUsuario);
rutaUsuario.get('/buscarUsuarios/:nombre', buscarUsuario);
rutaUsuario.post('/desactivarUsuarioEnCadena/:id_usuario', desactivarUsuarioEnCadena);


// Para registrar usuario con validación y carga de imagen
rutaUsuario.post('/registrarUsuario', cargarImagen, validarUsuario, registrarUsuario);

// Para actualizar usuario con validación y carga de imagen
rutaUsuario.put('/actualizarUsuario/:id_usuario', cargarImagen, validarUsu, actualizarUsuario);

// Para desactivar usuario
rutaUsuario.post('/desactivarUsuario/:id_usuario', desactivarUsuario);

export default rutaUsuario;
