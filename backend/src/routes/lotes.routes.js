import { Router } from "express";
import { Actualizarlote, Buscarlote,  Registrarlotes, listarlotes,DesactivarLote } from "../controllers/lotes.controller.js";
import { validarlotes, validarlotesactualizar } from "../../validate/lotes.validacion.js";
//import { validarToken } from "../controllers/autenticacion.js";

const rutalote = Router();

rutalote.get("/listarlote",listarlotes);
rutalote.post("/Registrarlote",validarlotes, Registrarlotes);
rutalote.put("/Actualizarlote/:id_lote",validarlotesactualizar, Actualizarlote)
rutalote.put("/desactivar/Lote/:id", DesactivarLote);
rutalote.get("/Buscarlote/:nombre",Buscarlote);


export default rutalote ;
