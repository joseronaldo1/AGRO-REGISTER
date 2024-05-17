import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const listarProduccion = async (req, res) => {
    try {
        let sql = `SELECT 
            produ.id_producccion,
            produ.cantidad_produccion,
            produ.precio,
            act.nombre_actividad AS nombre_actividad
        FROM produccion AS produ
        JOIN actividad AS act ON produ.fk_id_actividad = act.id_actividad`;


        const [listar] = await pool.query(sql);

        if (listar.length > 0) {
            res.status(200).json(listar);
        } else {
            res.status(400).json({
                status: 400,
                message: 'No hay ninguna producción'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error en el servidor',
        });
        console.log(error);
    }
};


export const registrarProduccion = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors });
        }

        const { cantidad_produccion, precio, fk_id_actividad } = req.body
        const [resultado] = await pool.query("insert into produccion(cantidad_produccion, precio, fk_id_actividad) values (?,?,?)", [cantidad_produccion, precio, fk_id_actividad])

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Producción registrada con exito"
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


export const BuscarProduccion = async (req, res) => {
    try {
        const { nombre } = req.params; // Obtener el nombre de la variedad desde los parámetros
        const searchTerm = `%${nombre}%`; // Cambio aquí: preparar el término de búsqueda para buscar coincidencias parciales
        const consultar = `
            SELECT cul.id_programacion,
                   cul.cantidad_produccion,
                   cul.precio, 
                   lo.nombre AS nombre_actividad, 
            FROM produccion AS cul
            JOIN actividad AS lo ON cul.fk_id_actividad = lo.id_actividad
            WHERE lo.nombre_actividad LIKE ?`; // Cambio aquí: utilizar el operador LIKE para buscar coincidencias parciales
        const [resultado] = await pool.query(consultar, [searchTerm]); // Pasar el término de búsqueda como parámetro

        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(404).json({
                mensaje: "No se encontró ningúna produccion con ese nombre de actividad"
            });
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error en el sistema: ' + error });
    }
};



export const actualizarProduccion = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { cantidad_produccion, precio, fk_id_actividad } = req.body;

        // Verifica si al menos uno de los campos está presente en la solicitud
        if (!cantidad_produccion && !precio && !fk_id_actividad) {
            return res.status(400).json({ message: 'Al menos uno de los campos (cantidad_produccion, precio, fk_id_actividad) debe estar presente en la solicitud para realizar la actualización.' });
        }


        const [oldProduccion] = await pool.query("SELECT * FROM produccion WHERE id_producccion=?", [id]);

        const updateValues = {
            cantidad_produccion: cantidad_produccion ? cantidad_produccion : oldProduccion[0].cantidad_produccion,
            precio: precio ? precio : oldProduccion[0].precio,
            fk_id_actividad: fk_id_actividad ? fk_id_actividad : oldProduccion[0].fk_id_actividad
        };

        const updateQuery = `UPDATE produccion SET cantidad_produccion=?, precio=?, fk_id_actividad=? WHERE id_producccion=?`;

        const [resultado] = await pool.query(updateQuery, [updateValues.cantidad_produccion, updateValues.precio, updateValues.fk_id_actividad, parseInt(id)]);

        if (resultado.affectedRows > 0) {
            res.status(200).json({ "mensaje": "La producción ha sido actualizada" });
        } else {
            res.status(404).json({ "mensaje": "No se pudo actualizar la producción" });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error en el servidor',
            error: error.message
        });
    }
};

export const eliminarProduccion = async (req, res) => {
    try {
        const id_produccion = req.body.id_produccion;

        if (!id_produccion) {
            return res.status(400).json({
                status: 400,
                message: 'Se requiere proporcionar el ID de la producción en el cuerpo de la solicitud'
            });
        }

        const [result] = await pool.query('DELETE FROM produccion WHERE id_produccion = ?', [id_produccion]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: 'Se eliminó la producción con éxito'
            });
        } else {
            res.status(404).json({
                status: 404,
                message: 'No se encontró ninguna producción con el ID proporcionado'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error en el servidor'
        });
    }
};
