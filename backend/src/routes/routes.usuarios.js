import { Router } from "express"
import { actualizarUsuario, listarUsuarios, buscarUsuario, DesactivarUsuario, registrarUsuario, cargarImagen, desactivarUsuarioEnCadena, buscarUsuari, acutualizarUsuario } from '../controllers/controller.usuarios.js'
import { validarUsuario, validarUsu } from '../../validate/UsuariosValidatekvd.js'
//import { validarToken } from '../controllers/autenticacion.js'

const rutaUsuario = Router();

rutaUsuario.get('/listarUsuario', listarUsuarios);
rutaUsuario.post('/registrarUsuario', validarUsuario, registrarUsuario, cargarImagen);
rutaUsuario.put('/actualizarUsuario/:id', validarUsu, actualizarUsuario, cargarImagen);
rutaUsuario.put("/desactivar/Usuario/:id", DesactivarUsuario);
rutaUsuario.get('/buscarUsuarios/:nombre', buscarUsuario);
rutaUsuario.post('/desactivarUsuarioEnCadena/:id_usuario', desactivarUsuarioEnCadena);

//pablo Andres movil 100%


//esto es para la parte movilpues es para que me traiga los datos de ese solo usuario y me los liste esto es el perfil de movil
rutaUsuario.get('/buscarUsuario/:id_usuario', buscarUsuari);

rutaUsuario.put('/actualizarUsuarioPablo/:id_usuario', validarUsu,cargarImagen, acutualizarUsuario);



export default rutaUsuario;
