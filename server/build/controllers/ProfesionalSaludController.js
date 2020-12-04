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
            const profesionales = await database_1.pool.query('SELECT prof.id,'
                + 'prof.nombre,'
                + 'prof.apellido,'
                + 'prof.contrasenia,'
                + 'ubic.direccion,'
                + 'barr.nombre as barrio,'
                + 'barr.id as "idBarrio",'
                + 'tipo.nombre as "tipoID",'
                + 'prof.id_tipoid as "idTipoID",'
                + 'uni.nombre as universidad,'
                + 'prof.id_universidad as "idUniversidad",'
                + 'ent.nombre as entidad,'
                + 'prof.id_entidad as "idEntidad" '
                + 'from profesional_salud as prof '
                + 'join ubicacion_profesional_salud as ubic on prof.id=ubic.id_profesional_salud '
                + 'join barrio as barr on barr.id=ubic.id_barrio '
                + 'join tipoid as tipo on tipo.id=prof.id_tipoid '
                + 'join universidad as uni on uni.id=prof.id_universidad '
                + 'join entidad_de_salud as ent on ent.id=prof.id_entidad');
            return res.status(200).json(profesionales.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async setProfesional(req, res) {
        try {
            const { id_miembro_secretaria, id, nombre, apellido, contrasenia, direccion, barrio, tipoID, universidad, entidad } = req.body;
            await database_1.pool.query('INSERT INTO profesional_salud (id, nombre, apellido, id_tipoid, id_universidad, id_entidad, contrasenia) '
                + 'VALUES ($1,$2,$3,$4,$5,$6,$7)', [id, nombre, apellido, tipoID, universidad, entidad, contrasenia]);
            await database_1.pool.query('INSERT INTO registro_profesional_salud (id_miembro_secretaria_salud, id_profesional_salud) '
                + 'VALUES ($1, $2)', [id_miembro_secretaria, id]);
            await database_1.pool.query('INSERT INTO ubicacion_profesional_salud (id_profesional_salud, id_barrio, direccion) '
                + 'VALUES ($1, $2, $3)', [id, barrio, direccion]);
            console.log(req.body);
            return res.status(200).send('INSERTADO');
        }
        catch (e) {
            console.log(e);
            const men = 'duplicate key value violates unique constraint "profesional_salud_pkey"';
            if (e.message == men) {
                return res.status(200).send('CONSTRAINT "profesional_salud_pkey"');
            }
            return res.status(500).json('Internal server error');
        }
    }
    async updateProfesional(req, res) {
        try {
            const { id, nombre, apellido, contrasenia, direccion, barrio, tipoID, universidad, entidad } = req.body;
            await database_1.pool.query('UPDATE profesional_salud SET nombre = $1, apellido = $2, id_tipoid = $3, id_universidad = $4, id_entidad = $5, contrasenia = $6 WHERE id = $7', [nombre, apellido, tipoID, universidad, entidad, contrasenia, id]);
            await database_1.pool.query('UPDATE ubicacion_profesional_salud SET id_barrio = $1, direccion = $2 WHERE id_profesional_salud = $3', [barrio, direccion, id]);
            return res.status(200).send('ACTUALIZADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async deleteProfesional(req, res) {
        try {
            const { id } = req.params;
            await database_1.pool.query('DELETE FROM profesional_salud WHERE id = $1', [id]);
            return res.status(200).send('BORRADO');
        }
        catch (e) {
            console.log(e);
            const men = 'update or delete on table "profesional_salud" violates foreign key constraint "FK_medico" on table "paciente"';
            if (e.message == men) {
                return res.status(200).send('CONSTRAINT "FK_medico"');
            }
            return res.status(500).json('Internal server error');
        }
    }
}
const profesionalSaludController = new ProfesionalSaludController();
exports.default = profesionalSaludController;
