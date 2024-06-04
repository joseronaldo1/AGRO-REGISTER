import { Router } from "express";
import { actualizarProgramacion, registrarProgramacion, listarProgramacion, buscarProgramacion, desactivar, desactivarProgamacionCadena } from "../controllers/programacionControllerDevdjz.js";

import { programacionA } from "../../validate/programacionValidateDevdjz.js"
import { programacionC } from "../../validate/programacionValidateDevdjz.js"

// import {validarToken} from "../controllers/autenticacion.js"


const rutaProgramacion = Router();
//
<<<<<<< HEAD
rutaProgramacion.post("/registrarProgramacion",    programacionC, registrarProgramacion);
rutaProgramacion.get("/listarProgramacion",   listarProgramacion);
rutaProgramacion.put("/actualizarProgramacion/:id",   programacionA, actualizarProgramacion);
rutaProgramacion.get("/buscarProgramacion/:nombre",  buscarProgramacion);
=======
rutaProgramacion.post("/registrarProgramacion", programacionC, registrarProgramacion);
rutaProgramacion.get("/listarProgramacion", listarProgramacion);
rutaProgramacion.put("/actualizarProgramacion/:id_programacion", programacionA, actualizarProgramacion);
rutaProgramacion.get("/buscarProgramacion/:nombre", buscarProgramacion);
>>>>>>> 4ba9714d4244b8fd31554d476e2145e728cbac2e
rutaProgramacion.put("/desactivar/Programacion/:id", desactivar);
rutaProgramacion.put("/desactivarEnCadena/Programacion/:id", desactivarProgamacionCadena);

export default rutaProgramacion