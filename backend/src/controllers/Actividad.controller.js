import { pool } from "../database/conexion.js";
import { validationResult } from 'express-validator';

//crud listar
//listar
export const listarA = async (req, res) => {
    try {
        let sql = `SELECT ac.id_actividad, 
                          ac.nombre_actividad, 
                          ac.tiempo, 
                          ac.observaciones,
                          ac.valor_actividad, 
                          ac.fk_id_variedad AS id_variedad, 
                          v.nombre_variedad,
                          ac.fk_id_finca AS id_finca,
                          f.nombre_finca,
                          ac.fk_id_lote AS id_lote,
                          l.nombre,
                          ac.fk_id_recursos AS id_tipo_recursos,
                          r.nombre_recursos,
                          ac.estado,
                          ac.*
                   FROM actividad AS ac 
                   JOIN variedad AS v ON ac.fk_id_variedad = v.id_variedad
                   JOIN finca AS f ON ac.fk_id_finca = f.id_finca
                   JOIN lotes AS l ON ac.fk_id_lote = l.id_lote
                   JOIN tipo_recursos AS r ON ac.fk_id_recursos = r.id_tipo_recursos`;
         
        const [result] = await pool.query(sql);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                "message": "No hay actividades que listar"
            });
        }
    } catch (error) {
        console.error(error); 
        res.status(500).json({
            "status": 500,
            "message": "Error en el sistema: " + error
        });
    }
};

export const RegistrarA = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors })
        }
        const { nombre_actividad, tiempo, observaciones, valor_actividad, fk_id_variedad, fk_id_finca, fk_id_lote, fk_id_recursos } = req.body
        const [resultado] = await pool.query("insert into actividad(nombre_actividad, tiempo, observaciones, valor_actividad, fk_id_variedad, fk_id_finca, fk_id_lote, fk_id_recursos) values (?,?,?,?,?,?,?,?)", [nombre_actividad, tiempo, observaciones, valor_actividad, fk_id_variedad, fk_id_finca, fk_id_lote, fk_id_recursos ])

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Actividad registrada con exito"
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


export const ActualizarA = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { id_actividad } = req.params; // Asegúrate de usar id_programacion aquí
      const { nombre_actividad, tiempo, observaciones, valor_actividad, fk_id_variedad, fk_id_finca, fk_id_lote, fk_id_recursos } = req.body;
  
      if (!nombre_actividad && !tiempo && !observaciones && !valor_actividad && !fk_id_variedad) {
        return res.status(400).json({ message: 'Al menos uno de los campos (nombre_actividad, tiempo, observaciones, valor_actividad, fk_id_variedad, fk_id_finca, fk_id_lote, fk_id_recursos) debe estar presente en la solicitud para realizar la actualización.' });
      }
  
      const [oldUser] = await pool.query("SELECT * FROM actividad WHERE id_actividad=?", [id_actividad]);
  
      const updateValues = {
        nombre_actividad: nombre_actividad ? nombre_actividad : oldUser[0].nombre_actividad,
        tiempo: tiempo ? tiempo : oldUser[0].tiempo,
        observaciones: observaciones ? observaciones : oldUser[0].observaciones,
        valor_actividad: valor_actividad ? valor_actividad : oldUser[0].valor_actividad,
        fk_id_variedad: fk_id_variedad ? fk_id_variedad : oldUser[0].fk_id_variedad,
        fk_id_finca: fk_id_finca ? fk_id_finca : oldUser[0].fk_id_finca,
        fk_id_lote: fk_id_lote ? fk_id_lote : oldUser[0].fk_id_lote,
        fk_id_recursos: fk_id_recursos ? fk_id_recursos : oldUser[0].fk_id_recursos
      };
  
      const updateQuery = `UPDATE actividad SET nombre_actividad=?, tiempo=?, observaciones=?, valor_actividad=?, fk_id_variedad=?, fk_id_finca=?, fk_id_lote=?, fk_id_recursos=? WHERE id_actividad=?`;
  
      const [resultado] = await pool.query(updateQuery, [updateValues.nombre_actividad, updateValues.tiempo, updateValues.observaciones, updateValues.valor_actividad, updateValues.fk_id_variedad, updateValues.fk_id_finca, updateValues.fk_id_lote, updateValues.fk_id_recursos, parseInt(id_actividad)]);
  
      if (resultado.affectedRows > 0) {
        res.status(200).json({ "mensaje": "La actividad ha sido actualizada" });
      } else {
        res.status(404).json({ "mensaje": "No se pudo actualizar la actividad" });
      }
    } catch (error) {
      res.status(500).json({ "mensaje": error.message });
    }
  };


export const DesactivarA = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const [oldRecurso] = await pool.query("SELECT * FROM actividad WHERE id_actividad = ?", [id]); 
        
        const [result] = await pool.query(
            `UPDATE actividad SET estado = ${estado ? `'${estado}'` : `'${oldRecurso[0].estado}'`} WHERE id_actividad = ?`,[id]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: 'Se cambio el estado con éxito',
                result: result
            });
        } else {
            res.status(404).json({
                status: 404,
                message: 'No se pudo cambiar el estado'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error
        });
    }
}



// CRUD - Buscar
// CRUD - Buscar
export const BuscarA = async (req, res) => {
    try {
        const { nombre } = req.params;
        const searchTerm = `%${nombre}%`; // Preparar el término de búsqueda para buscar coincidencias parciales
        const query = `
            SELECT a.*, v.nombre_variedad
            FROM actividad a
            INNER JOIN variedad v ON a.fk_id_variedad = v.id_variedad
            INNER JOIN finca f ON a.fk_id_finca = f.id_finca
            INNER JOIN lotes l ON a.fk_id_lote = l.id_lote
            INNER JOIN tipo_recursos tr ON a.fk_id_recursos = tr.id_tipo_recursos
            WHERE a.nombre_actividad LIKE ?
            OR a.tiempo LIKE ?
            OR a.observaciones LIKE ?
            OR a.valor_actividad LIKE ?
            OR v.nombre_variedad LIKE ?
            OR f.nombre_finca LIKE ?
            OR l.nombre LIKE ?
            OR tr.nombre_recursos LIKE ?`; // Utilizar el operador LIKE para buscar coincidencias parciales en varios campos

        const [result] = await pool.query(query, [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm]);
                    
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
            message: "Error en el sistema"
        });
    }
};
