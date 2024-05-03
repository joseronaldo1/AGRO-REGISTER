import { Router } from "express"
import  {actualizarUsuario, listarUsuarios, buscarUsuario, desactivarUsuario, registrarUsuarios} from '../controllers/controller.usuarios.js'

import {validarUsuario, validarUsu} from '../../validate/UsuariosValidatekvd.js'
//import { validarToken } from '../controllers/autenticacion.js'

const rutaUsuario = Router();

<<<<<<< HEAD
rutaUsuario.get('/listarUsuario',listarUsuarios);  
rutaUsuario.post('/registrarUsuario',validarUsuario,registrarUsuarios);
rutaUsuario.post('/desactivarUsuario/:id_usuario', desactivarUsuario);
rutaUsuario.put('/actualizarUsuario/:id_usuario', validarUsu,actualizarUsuario);
rutaUsuario.get('/buscarUsuarios/:id_usuario', buscarUsuario);
=======
rutaUsuario.get('/listarUsuario', listarUsuarios);  
rutaUsuario.post('/registrarUsuario',validarUsuario,registrarUsuarios);
rutaUsuario.post('/desactivarUsuario/:id_usuario', desactivarUsuario);
rutaUsuario.put('/actualizarUsuario/:id_usuario',validarToken, validarUsu,actualizarUsuario);
rutaUsuario.get('/buscarUsuarios/:id_usuario',validarToken, buscarUsuario);
>>>>>>> ce356180d09bbe90b2cdd0ae06edde0a5f5121d3


export default rutaUsuario;
//rnn
