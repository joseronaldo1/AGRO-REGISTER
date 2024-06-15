import { Router } from "express";
import { listarA,RegistrarA,ActualizarA,DesactivarA,BuscarA, BuscarPorUsuarioMovil, BuscaUnaACtividad } from "../controllers/Actividad.controller.js";
import { validarRA, validarRR } from "../../validate/Actividad.js";

import { validarToken } from "../controllers/autenticacion.js";

const rutaDeActividad = Router()

//localhost:4000/VariedadCultivo
rutaDeActividad.get("/listarActividad", listarA);
rutaDeActividad.post("/RegistrarActividad", validarToken, validarRR, RegistrarA);
rutaDeActividad.put("/ActualizarActividad/:id_actividad", validarToken, validarRA, ActualizarA);
rutaDeActividad.put("/Desactivara/actividad/:id", validarToken, DesactivarA); 
rutaDeActividad.get("/Buscaractividad/:nombre", validarToken, BuscarA);

rutaDeActividad.get('/BuscarPorUsuarioActividad/:fk_id_usuario',BuscarPorUsuarioMovil );
rutaDeActividad.get('/BuscarActivida/:id_actividad',BuscaUnaACtividad );

export default rutaDeActividad ;
