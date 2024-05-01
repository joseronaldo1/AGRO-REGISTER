import { pool } from "../database/conexion.js";
import  Jwt  from "jsonwebtoken";



import bcrypt from 'bcrypt';

export const validar = async (req, res) => {
    try {
        const { correo, password } = req.body;
        const sql = `SELECT * FROM usuarios WHERE correo='${correo}'`;
        const [rows] = await pool.query(sql);

        if (rows.length > 0) {
            const user = rows[0];
            // Aquí compararemos la contraseña proporcionada con la contraseña almacenada encriptada en la base de datos
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                // Si las contraseñas coinciden, generar el token y enviar la respuesta
                const token = Jwt.sign({ user }, process.env.AUT_SECRET, { expiresIn: process.env.AUT_EXPIRE });
                return res.status(200).json({ nombre: user.nombre, token: token, message: 'Token generado con éxito' });
            } else {
                // Si las contraseñas no coinciden, enviar un mensaje de error
                return res.status(404).json({ message: 'Credenciales inválidas' });
            }
        } else {
            // Si no se encuentra el usuario, enviar un mensaje de usuario no encontrado
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.log(error);
        // En caso de error, enviar un mensaje de error del servidor
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