import { Router } from "express";
import { listarA,RegistrarA,ActualizarA,DesactivarA,BuscarA } from "../controllers/Actividad.controller.js";
import { validarRA, validarRR } from "../../validate/Actividad.js";

//import {validarToken} from "../controllers/autenticacion.js";

const rutaDeActividad = Router()

//localhost:4000/VariedadCultivo
rutaDeActividad.get("/listarActividad", listarA);
rutaDeActividad.post("/RegistrarActividad",validarRR, RegistrarA);
rutaDeActividad.put("/ActualizarActividad/:id_actividad", validarRA, ActualizarA);
rutaDeActividad.put("/Desactivara/actividad/:id", DesactivarA); 
rutaDeActividad.get("/Buscaractividad/:nombre", BuscarA);

export default rutaDeActividad ;
