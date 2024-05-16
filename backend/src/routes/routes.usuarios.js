import { Router } from "express"
import { actualizarUsuario, listarUsuarios, buscarUsuario, desactivarUsuario, registrarUsuario, cargarImagen } from '../controllers/controller.usuarios.js'
import { validarUsuario, validarUsu } from '../../validate/UsuariosValidatekvd.js'
//import { validarToken } from '../controllers/autenticacion.js'

const rutaUsuario = Router();

rutaUsuario.get('/listarUsuario',listarUsuarios);
rutaUsuario.post('/registrarUsuario', validarUsuario, registrarUsuario, cargarImagen);
rutaUsuario.post('/desactivarUsuario/:id_usuario', desactivarUsuario);
rutaUsuario.put('/actualizarUsuario/:id_usuario', validarUsu, actualizarUsuario, cargarImagen);
rutaUsuario.get('/buscarUsuarios/:id_usuario', buscarUsuario);



export default rutaUsuario;
