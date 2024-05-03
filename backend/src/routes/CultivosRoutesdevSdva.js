import { Router } from "express";
import {registrar,  actualizar,  buscar, listar, desactivar } from '../controllers/CultivosControllerdevSdva.js';
import { validacionCultivosA, validacionCultivosR } from "../../validate/CultivosValidatedevSdva.js";
//import { validarToken } from "../controllers/autenticacion.js"; 


const rutaCultivos = Router();

rutaCultivos.get('/listarCultivos', listar);
rutaCultivos.post('/registrarCultivos',  validacionCultivosR, registrar);
rutaCultivos.get('/buscarCultivo/:nombre', buscar); 
rutaCultivos.put('/actualizarCultivo/:id_cultivo', validacionCultivosA, actualizar);


rutaCultivos.put("/desactivar/Cultivo/:id", desactivar);
export default rutaCultivos;