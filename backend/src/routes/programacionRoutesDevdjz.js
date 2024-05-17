import { Router } from "express";
import { actualizarProgramacion, registrarProgramacion, listarProgramacion, buscarProgramacion, desactivar, desactivarProgamacionCadena } from "../controllers/programacionControllerDevdjz.js";

import { programacionA } from "../../validate/programacionValidateDevdjz.js"
import { programacionC } from "../../validate/programacionValidateDevdjz.js"

// import {validarToken} from "../controllers/autenticacion.js"


const rutaProgramacion = Router();
//
rutaProgramacion.post("/registrarProgramacion", programacionC, registrarProgramacion);
rutaProgramacion.get("/listarProgramacion", listarProgramacion);
rutaProgramacion.put("/actualizarProgramacion/:id", programacionA, actualizarProgramacion);
rutaProgramacion.get("/buscarProgramacion/:nombre", buscarProgramacion);
rutaProgramacion.put("/desactivar/Programacion/:id", desactivar);
rutaProgramacion.put("/desactivarEnCadena/Programacion/:id", desactivarProgamacionCadena);

export default rutaProgramacion