import { Router } from "express";
import { listarA,RegistrarA,ActualizarA,DesactivarA,BuscarA } from "../controllers/Actividad.controller.js";
import { validarRA, validarRR, validarD } from "../../validate/Actividad.js";

//import {validarToken} from "../controllers/autenticacion.js";

const rutaDeActividad = Router()

//localhost:4000/VariedadCultivo
rutaDeActividad.get("/listara", listarA);
rutaDeActividad.post("/RegistrarActividad",validarRR, RegistrarA);
rutaDeActividad.put("/ActualizarActividad/:id", validarRA, ActualizarA);

rutaDeActividad.put("/Desactivara/actividad/:id", validarD, DesactivarA); 
rutaDeActividad.get("/Buscaractividad/:nombre", BuscarA);

export { rutaDeActividad };