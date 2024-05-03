import { Router } from "express";
import { listarA,RegistrarA,ActualizarA,DesactivarA,BuscarA } from "../controllers/Actividad.controller.js";
import { validarRA, validarRR } from "../../validate/Actividad.js";

//import {validarToken} from "../controllers/autenticacion.js";

const rutaDeActividad = Router()

//localhost:4000/VariedadCultivo
<<<<<<< HEAD
rutaDeActividad.get("/listara", listarA);
rutaDeActividad.post("/Registrara",validarRR, RegistrarA);
rutaDeActividad.put("/actividad/:id", validarRA, ActualizarA);
=======
rutaDeActividad.get("/listarActividad", listarA);
rutaDeActividad.post("/RegistrarActividad",validarRR, RegistrarA);
rutaDeActividad.put("/ActualizarActividad/:id", validarRA, ActualizarA);
>>>>>>> f89cae0e07c132105c794ce36c9e9ba139d10b88

rutaDeActividad.put("/Desactivara/actividad/:id", DesactivarA); 
rutaDeActividad.get("/Buscaractividad/:nombre", BuscarA);

export { rutaDeActividad };