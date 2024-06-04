import { Router } from "express"
import { actualizarUsuario, listarUsuarios, buscarUsuario, desactivarUsuario, registrarUsuario, cargarImagen, desactivarUsuarioEnCadena } from '../controllers/controller.usuarios.js'
import { validarUsuario, validarUsu } from '../../validate/UsuariosValidatekvd.js'
//import { validarToken } from '../controllers/autenticacion.js'

const rutaUsuario = Router();

rutaUsuario.get('/listarUsuario', listarUsuarios);
rutaUsuario.post('/registrarUsuario', validarUsuario, registrarUsuario, cargarImagen);
rutaUsuario.put('/actualizarUsuario/:id', validarUsu, actualizarUsuario, cargarImagen);
rutaUsuario.put("/desactivar/Usuario/:id", desactivarUsuario);
rutaUsuario.get('/buscarUsuarios/:nombre', buscarUsuario);
rutaUsuario.post('/desactivarUsuarioEnCadena/:id_usuario', desactivarUsuarioEnCadena);




export default rutaUsuario;
