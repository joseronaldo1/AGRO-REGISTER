import { Router } from "express";
import { registrarVariedad, listarVariedades, actualizarVariedad,  buscarVariedad } from "../controllers/variedad.controller.js";
import { validarRegistroVariedad, validarActualizacionVariedad } from "../../validate/validarVariedad.js";

//import {validarToken} from "../controllers/autenticacion.js";

const rutaDeVariedad = Router();
//rutas de variedad de cultivo
rutaDeVariedad.post("/registrarVariedad", validarRegistroVariedad, registrarVariedad);
rutaDeVariedad.get("/listarVariedades",listarVariedades);
rutaDeVariedad.put("/actualizarVariedad/:id",validarActualizacionVariedad, actualizarVariedad);

rutaDeVariedad.get("/buscarVariedad/:nombre", buscarVariedad);

export default rutaDeVariedad;


