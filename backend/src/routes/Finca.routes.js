import { Router } from "express";
import { listarFinca, RegistroFinca, ActualizarFinca, BuscarFinca } from "../controllers/Finca.controller.js";
import { validarFincaA } from "../../validate/Finca.js";
import { validarFincaR } from "../../validate/Finca.js";
//import { validarToken } from "../controllers/autenticacion.js";

const router = Router();

router.get("/listarFinca", listarFinca);
router.post("/RegistroFinca", validarFincaR, RegistroFinca);
router.put("/actualizarFinca/:id", validarFincaA, ActualizarFinca);
router.get("/buscarFinca/:nombre", BuscarFinca);

export default router;

