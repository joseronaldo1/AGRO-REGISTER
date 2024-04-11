import { Router } from "express";
import { listarA,RegistrarA,ActualizarA,DesactivarA,BuscarA } from "../controllers/Actividad.controller.js";
import { validarRA, validarRR, validarD } from "../../validate/Actividad.js";

import {validarToken} from "../controllers/autenticacion.js";

const rutaDeActividad = Router()

//localhost:4000/VariedadCultivo
rutaDeActividad.get("/listara",validarToken, listarA);
rutaDeActividad.post("/Registrara",validarToken, validarRR, RegistrarA);
rutaDeActividad.put("/Actualizara/actividad/:id",validarToken, validarRA, ActualizarA);
rutaDeActividad.put("/Desactivara/actividad/:id", validarToken ,validarD, DesactivarA);
rutaDeActividad.get("/Buscar/actividad/:id",validarToken, BuscarA);

export { rutaDeActividad };
//crud