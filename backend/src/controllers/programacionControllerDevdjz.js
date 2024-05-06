import { pool } from "../database/conexion.js";
import {validationResult} from "express-validator"

// CRUD - Registrar
export const registrarProgramacion = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors })
        }
        const { fecha_inicio, fecha_fin, fk_id_usuario, fk_id_actividad, fk_id_cultivo } = req.body
        const [resultado] = await pool.query("insert into programacion(fecha_inicio, fecha_fin, fk_id_usuario, fk_id_actividad, fk_id_cultivo) values (?,?,?,?,?)", [fecha_inicio, fecha_fin, fk_id_usuario, fk_id_actividad, fk_id_cultivo])

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Programación registrada con exito"
            })
        } else {
            res.status(400).json({
                "mensaje": "hay un error no se pudo guardar"
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}


// CRUD - Listar
export const listarProgramacion = async (req, res) => {
    try {
        let sql = ` SELECT 
        p.id_programacion,
        p.fecha_inicio, p.fecha_fin,
        u.nombre,
        a.nombre_actividad,
        c.id_cultivo,
        p.estado
    FROM 
        programacion AS p
    JOIN 
        usuarios AS u ON p.fk_id_usuario = u.id_usuario
    JOIN 
        actividad AS a ON p.fk_id_actividad = a.id_actividad
    JOIN 
        cultivo AS c ON p.fk_id_cultivo = c.id_cultivo;
      `;

        const [result] = await pool.query(sql);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                status: 404,
                message: 'No hay ninguna asignación'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Error interno del servidor'
        });
    }
}


// CRUD - Actualizar
export const actualizarProgramacion = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const { id } = req.params;
        const { fecha_inicio, fecha_fin, fk_id_usuario, fk_id_actividad, fk_id_cultivo, estado } = req.body;

        // Verificar si el usuario existe
        const [usuarioExist] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [fk_id_usuario]);
        if (usuarioExist.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "El usuario no existe, registre un usuario"
            });
        }

        // Verificar si la actividad existe
        const [actividadExist] = await pool.query('SELECT * FROM actividad WHERE id_actividad = ?', [fk_id_actividad]);
        if (actividadExist.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "La actividad no existe, registre una actividad"
            });
        }

        // Verificar si el cultivo existe
        const [cultivoExist] = await pool.query('SELECT * FROM cultivo WHERE id_cultivo = ?', [fk_id_cultivo]);
        if (cultivoExist.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "El cultivo no existe, registre un cultivo"
            });
        }

        // Actualizar la programación
        const [result] = await pool.query(
            `UPDATE programacion 
            SET fecha_inicio = ?, fecha_fin = ?, fk_id_usuario = ?, fk_id_actividad = ?, fk_id_cultivo = ?, estado = ? 
            WHERE id_programacion = ?`, 
            [fecha_inicio, fecha_fin, fk_id_usuario, fk_id_actividad, fk_id_cultivo, estado, id]
        );

        if (result.affectedRows > 0) {
            return res.status(200).json({
                status: 200,
                message: 'Se actualizó con éxito',
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: 'No se encontró la programación para actualizar'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};


export const desactivar = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const [oldRecurso] = await pool.query("SELECT * FROM programacion WHERE id_programacion = ?", [id]); 
        
        const [result] = await pool.query(
            `UPDATE programacion SET estado = ${estado ? `'${estado}'` : `'${oldRecurso[0].estado}'`} WHERE id_programacion = ?`,[id]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: 'Se actualizo el estado con éxito',
                result: result
            });
        } else {
            res.status(404).json({
                status: 404,
                message: 'No se encontró el estado para actualizar'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error
        });
    }
}

// CRUD -buscar
export const buscarProgramacion = async (req, res) => {
    try {
        const { nombre } = req.params; // Obtener el nombre de usuario desde los parámetros
        const searchTerm = `%${nombre}%`; // Preparar el término de búsqueda para buscar coincidencias parciales
        const consultar = `
            SELECT 
                p.id_programacion,
                p.fecha_inicio, p.fecha_fin,
                u.nombre AS usuario,
                a.nombre_actividad,
                v.nombre_variedad,
                l.nombre AS lote,
                p.estado
            FROM 
                programacion AS p
            JOIN 
                usuarios AS u ON p.fk_id_usuario = u.id_usuario
            JOIN 
                actividad AS a ON p.fk_id_actividad = a.id_actividad
            JOIN 
                lotes AS l ON p.fk_id_cultivo = l.id_lote
            JOIN 
                variedad AS v ON p.fk_id_cultivo = v.id_variedad
            WHERE u.nombre LIKE ?`; // Utilizar el operador LIKE para buscar coincidencias parciales en el nombre de usuario
        const [result] = await pool.query(consultar, [searchTerm]); // Pasar el término de búsqueda como parámetro

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                status: 404,
                message: 'No se encontraron resultados para la búsqueda'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};

