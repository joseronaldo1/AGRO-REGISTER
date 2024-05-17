import { Router } from "express"
import { actualizarUsuario, listarUsuarios, buscarUsuario, desactivarUsuario, registrarUsuario, cargarImagen, desactivarUsuarioEnCadena } from '../controllers/controller.usuarios.js'
import { validarUsuario, validarUsu } from '../../validate/UsuariosValidatekvd.js'
//import { validarToken } from '../controllers/autenticacion.js'

const rutaUsuario = Router();

rutaUsuario.get('/listarUsuario',listarUsuarios);
rutaUsuario.post('/registrarUsuario', validarUsuario, registrarUsuario, cargarImagen);
rutaUsuario.post('/desactivarUsuario/:id_usuario', desactivarUsuario);
rutaUsuario.put('/actualizarUsuario/:id_usuario', validarUsu, actualizarUsuario, cargarImagen);
rutaUsuario.get('/buscarUsuarios/:id_usuario', buscarUsuario);
rutaUsuario.post('/desactivarUsuarioEnCadena/:id_usuario', desactivarUsuarioEnCadena);




export default rutaUsuario;
