import { Router } from "express"
import { cargarImagen,actualizarEmpleado, listarEmpleado, buscarEmpleado, DesactivarEmpleado, registrarEmpleado, desactivarUsuarioEnCadena } from '../controllers/Empleado.controller.js'
import { validarRegiEmpleado, validarActuEmpleado } from '../../validate/EmpleadoValidar.js'
//import { validarToken } from '../controllers/autenticacion.js'

const rutaUsuario = Router();

rutaUsuario.get('/listarEmpleado', listarEmpleado);
rutaUsuario.post('/registrarEmpleado', validarRegiEmpleado, registrarEmpleado, cargarImagen);
rutaUsuario.put('/actualizarEmpleado/:id', validarActuEmpleado, actualizarEmpleado, cargarImagen);
rutaUsuario.put("/desactivar/Empleado/:id", DesactivarEmpleado);
rutaUsuario.get('/buscarEmpleado/:nombre', buscarEmpleado);
rutaUsuario.post('/desactivarUsuarioEnCadena/:id', desactivarUsuarioEnCadena);




export default rutaUsuario;
