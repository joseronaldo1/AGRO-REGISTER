import { Router } from "express"
import { actualizarUsuario, listarUsuarios, buscarUsuario, desactivarUsuario, registrarUsuario, cargarImagen, desactivarUsuarioEnCadena } from '../controllers/controller.usuarios.js'
import { validarUsuario, validarUsu } from '../../validate/UsuariosValidatekvd.js'
import { validarToken } from '../controllers/autenticacion.js'

const rutaUsuario = Router();

rutaUsuario.get('/listarUsuario', validarToken, listarUsuarios);
rutaUsuario.post('/registrarUsuario', validarUsuario, registrarUsuario, cargarImagen);
rutaUsuario.put('/actualizarUsuario/:id', validarToken, validarUsu, actualizarUsuario, cargarImagen);
rutaUsuario.put("/desactivar/Usuario/:id", validarToken, desactivarUsuario);
rutaUsuario.get('/buscarUsuarios/:nombre', validarToken, buscarUsuario);
rutaUsuario.post('/desactivarUsuarioEnCadena/:id_usuario', desactivarUsuarioEnCadena);

//pablo Andres movil 100%


//esto es para la parte movilpues es para que me traiga los datos de ese solo usuario y me los liste esto es el perfil de movil
rutaUsuario.get('/buscarUsuario/:id_usuario', buscarUsuari);

rutaUsuario.put('/actualizarUsuarioPablo/:id_usuario', validarUsu,cargarImagen, acutualizarUsuario);



export default rutaUsuario;
