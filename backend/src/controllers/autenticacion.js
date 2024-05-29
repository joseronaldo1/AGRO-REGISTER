import { pool } from "../database/conexion.js";
import Jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

export const validar = async (req, res) => {
    try {
        const { correo, password } = req.body;
        const sql = `SELECT * FROM usuarios WHERE correo='${correo}'`;
        const [rows] = await pool.query(sql);

        if (rows.length > 0) {
            const user = rows[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = Jwt.sign({ user }, process.env.AUT_SECRET, { expiresIn: process.env.AUT_EXPIRE });
                // Aquí también obtenemos el rol del usuario y lo enviamos junto con el token
                return res.status(200).json({ nombre: user.nombre, rol: user.rol, token: token, message: 'Token generado con éxito' });
            }
        } else {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: 'Error del servidor' + error });
    }
};

export const validarToken = async (req, res, next) => {
    try {
        let tokenClient = req.headers['token']
        if (!tokenClient) {
            return res.status(403).json({ 'message': 'Token es requerido' })
        } else {
            const token = Jwt.verify(tokenClient, process.env.AUT_SECRET, (error, decoded) => {
                if (error) {
                    return res.status(403).json({ message: 'Token es obligatorio' })
                } else {
                    // Aquí verificamos el rol del usuario antes de permitir el acceso
                    if (decoded.user.rol === 'administrador' || decoded.user.rol === 'empleado') {
                        next();
                    } else {
                        return res.status(403).json({ message: 'Acceso no autorizado' });
                    }
                }
            })
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Error del servidor' + error })
    }
}
