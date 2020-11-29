"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class ProfesionalSaludController {
    async getProfesionalesFullName(req, res) {
        try {
            const profesionales = await database_1.pool.query(`SELECT id, (nombre || ' ' || apellido) AS "nombre" FROM profesional_salud ORDER BY id ASC`);
            return res.status(200).json(profesionales.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async getProfesionales(req, res) {
        try {
            const profesionales = await database_1.pool.query('SELECT * FROM profesional_salud ORDER BY (id) ASC');
            return res.status(200).json(profesionales.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const profesional = await database_1.pool.query('SELECT * FROM profesional_salud WHERE id = $1', [id]);
            if (profesional.rows.length > 0) {
                return res.status(200).json(profesional.rows);
            }
            else {
                return res.send('Profesional no encontrado');
            }
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async postProfesional(req, res) {
        try {
            const { id, nombre, apellido, id_tipoID, id_universidad, id_entidad, contrasenia } = req.body;
            await database_1.pool.query('INSERT INTO profesional_salud {id, nombre, apellido, id_tipoID, id_universidad, id_entidad, contrasenia} VALUES {$1, $2, $3, $4, $5, $6, $7}'),
                [id, nombre, apellido, id_tipoID, id_universidad, id_entidad, contrasenia];
            console.log(req.body);
            return res.status(200).send('INSERTADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async putProfesional(req, res) {
        try {
            const { id, nombre, apellido, id_tipoID, id_universidad, id_entidad, contrasenia } = req.body;
            await database_1.pool.query('UPDATE profesional_salud SET nombre = $1, apellido = $2, id_tipoid = $3, id_universidad = $4, id_entidad = $5, contrasenia = $6 WHERE id = $7'),
                [nombre, apellido, id_tipoID, id_universidad, id_entidad, contrasenia, id];
            return res.status(200).send('ACTUALIZADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async deleteProfesional(req, res) {
        try {
            const { id } = req.body;
            await database_1.pool.query('DELETE FROM profesional_salud WHERE id = $1', [id]);
            return res.status(200).send('BORRADO');
        }
        catch (e) {
            let men = 'update or delete on table "profesional_salud" violates foreign key constraint "FK_medico" on table "paciente"';
            if (e.message == men) {
                return res.status(200).send('CONSTRAINT "FK_medico"');
            }
            return res.status(500).json('Internal server error');
        }
    }
}
const profesionalSaludController = new ProfesionalSaludController();
exports.default = profesionalSaludController;
