import { Router } from "express";

import { BuscarProduccion, actualizarProduccion, listarProduccion, registrarProduccion } from "../controllers/ProduccionControllerDevpap.js";
import { ValidateProduccion, actualizar } from "../../validate/ProduccionValidateDevpap.js";
//import { validarToken } from "../controllers/autenticacion.js";


const produccion = Router()

produccion.get('/listarProduccion',listarProduccion);
produccion.post('/RegistraProduccion',ValidateProduccion,registrarProduccion);
produccion.get('/BuscarProduccion/:nombre',BuscarProduccion);
produccion.put('/ActualizarProduccion/:id',actualizar,actualizarProduccion);
export default produccion


