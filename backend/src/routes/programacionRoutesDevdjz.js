import { Router } from "express";
import { actualizarProgramacion, registrarProgramacion, listarProgramacion, buscarProgramacion, desactivar, desactivarProgamacionCadena, listarProgramacionPorUsuario, BuscaActividadId } from "../controllers/programacionControllerDevdjz.js";

import { programacionA } from "../../validate/programacionValidateDevdjz.js"
import { programacionC } from "../../validate/programacionValidateDevdjz.js"

// import {validarToken} from "../controllers/autenticacion.js"


const rutaProgramacion = Router();
//
rutaProgramacion.post("/registrarProgramacion", programacionC, registrarProgramacion);
rutaProgramacion.get("/listarProgramacion", listarProgramacion);
rutaProgramacion.put("/actualizarProgramacion/:id_programacion", programacionA, actualizarProgramacion);
rutaProgramacion.get("/buscarProgramacion/:nombre", buscarProgramacion);
rutaProgramacion.put("/desactivar/Programacion/:id", desactivar);
rutaProgramacion.put("/desactivarEnCadena/Programacion/:id", desactivarProgamacionCadena);



//pablo Andres Paerdomo

rutaProgramacion.get('/listarProgramacionPorUsuario/:id_usuario',listarProgramacionPorUsuario)
rutaProgramacion.get('/BuscaActividad/:idActividad', BuscaActividadId);

export default rutaProgramacion