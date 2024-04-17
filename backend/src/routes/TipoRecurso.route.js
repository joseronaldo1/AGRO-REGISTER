import { Router } from "express";
import { listarTipoRecurso, RegistroTipoRecurso, ActualizarTipoRecurso, BuscarTipoRecurso } from "../controllers/TipoRecurso.controller.js";
import { validarRer } from "../../validate/TrecursoValidate.js";
import { validarRea } from "../../validate/TrecursoValidate.js";

import { validarToken } from "../controllers/autenticacion.js";

const rutaDeTipoRecurso = Router()

//localhost:4000/VariedadCultivo
rutaDeTipoRecurso.get("/listarRecurso", listarTipoRecurso);
rutaDeTipoRecurso.post("/RegistroRecurso", validarRer,  RegistroTipoRecurso);
rutaDeTipoRecurso.put("/actualizarRecurso/:id",validarRea, ActualizarTipoRecurso);
/* rutaDeTipoRecurso.put("/desactivar/Recurso/:id", DesactivarTipoRecurso); */
rutaDeTipoRecurso.get("/buscarRecurso/:id", BuscarTipoRecurso);

export  default rutaDeTipoRecurso ;

//crud