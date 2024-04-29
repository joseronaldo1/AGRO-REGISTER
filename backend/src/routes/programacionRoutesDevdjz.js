import { Router } from "express";
import { actualizarProgramacion, registrarProgramacion, listarProgramacion, buscarProgramacion, estadoProgramacion } from "../controllers/programacionControllerDevdjz.js";

import { programacionA } from "../../validate/programacionValidateDevdjz.js"
import { programacionC } from "../../validate/programacionValidateDevdjz.js"

// import {validarToken} from "../controllers/autenticacion.js"


const rutaProgramacion = Router(); 
//
rutaProgramacion.post("/registrarProgramacion",    programacionC, registrarProgramacion);
rutaProgramacion.get("/listarProgramacion",   listarProgramacion);
rutaProgramacion.put("/actualizarProgramacion/:id",   programacionA, actualizarProgramacion);
rutaProgramacion.put("/estadoProgramacion/:id",   estadoProgramacion);
rutaProgramacion.get("/buscarProgramacion/:id",  buscarProgramacion);

export default rutaProgramacion

