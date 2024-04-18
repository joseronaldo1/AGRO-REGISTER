import { pool } from "../database/conexion.js";
import  Jwt  from "jsonwebtoken";



export const validar = async (req, res) => {
    try {
        const { correo, password } = req.body;
        const sql = `SELECT * FROM usuarios WHERE correo='${correo}' AND password='${password}'`;
        const [rows] = await pool.query(sql);

        if (rows.length > 0) {
            const token = Jwt.sign({ rows }, process.env.AUT_SECRET, { expiresIn: process.env.AUT_EXPIRE });
            return res.status(200).json({ 'nombre': rows, 'token': token, message: 'Token generado con éxito' });
        } else {
            return res.status(404).json({ "message": "Usuario no autorizado" });
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error del servidor' + error });
    }
};

//verificar

export const validarToken = async (req, res, next) => {

    try {
        
        let tokenClient = req.headers['token']

        if(!tokenClient){
            return res.status(403).json({'message': 'Token es requerido'})
        }else{
            const token = Jwt.verify(tokenClient, process.env.AUT_SECRET, (error, decoded) => {
                if(error){
                    return res.status(403).json({message: 'Token es obligatorio'})
                }else{
                    next()
                }
            })
        }

    } catch (error) {
        return res.status(500).json({status: 500, message: 'Error del servidor' + error})
    }
    
}