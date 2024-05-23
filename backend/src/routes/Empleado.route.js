import { Router } from "express"
import { actualizarEmpleado, listarEmpleado, buscarEmpleado, DesactivarEmpleado, registrarEmpleado, desactivarUsuarioEnCadena } from '../controllers/Empleado.controller.js'
import { validarRegiEmpleado, validarActuEmpleado } from '../../validate/EmpleadoValidar.js'
//import { validarToken } from '../controllers/autenticacion.js'

const rutaUsuario = Router();

rutaUsuario.get('/listarEmpleado', listarEmpleado);
rutaUsuario.post('/registrarEmpleado', validarRegiEmpleado, registrarEmpleado);
rutaUsuario.put('/actualizarEmpleado/:id', validarActuEmpleado, actualizarEmpleado);
rutaUsuario.put("/desactivar/Empleado/:id", DesactivarEmpleado);
rutaUsuario.get('/buscarEmpleado/:nombre', buscarEmpleado);
rutaUsuario.post('/desactivarUsuarioEnCadena/:id', desactivarUsuarioEnCadena);




export default rutaUsuario;
