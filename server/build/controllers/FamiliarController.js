"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class FamiliarController {
    async getFamiliares(req, res) {
        try {
            const { id_paciente } = req.body;
            const familiares = await database_1.pool.query('SELECT fam.id,'
                + 'fam.nombre,'
                + 'fam.apellido,'
                + 'fam.email,'
                + 'fam.telefono,'
                + 'rel.parentesco,'
                + 'tipo.nombre as "tipoID",'
                + 'fam.id_tipoid as "idTipoID" '
                + 'from familiar as fam join tipoid as tipo on fam.id_tipoid=tipo.id '
                + 'join paciente_familiar as rel on rel.id_familiar=fam.id WHERE rel.id_paciente=$1', [id_paciente]);
            return res.status(200).json(familiares.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async setFamiliar(req, res) {
        try {
            const { id_paciente, id, nombre, apellido, email, telefono, parentesco, tipoID } = req.body;
            await database_1.pool.query('INSERT INTO familiar (id, nombre, apellido, id_tipoid, email, telefono) '
                + 'VALUES ($1, $2, $3, $4, $5, $6)', [id, nombre, apellido, tipoID, email, telefono]);
            await database_1.pool.query('INSERT INTO paciente_familiar (id_paciente, id_familiar, parentesco) VALUES ($1, $2, $3)', [id_paciente, id, parentesco]);
            return res.status(200).send('INSERTADO');
        }
        catch (e) {
            console.log(e);
            const men = 'duplicate key value violates unique constraint "familiar_pkey"';
            if (e.message == men) {
                return res.status(200).send('CONSTRAINT "familiar_pkey"');
            }
            return res.status(500).json('Internal server error');
        }
    }
    async updateFamiliar(req, res) {
        try {
            const { id_paciente, id, nombre, apellido, email, telefono, parentesco, tipoID } = req.body;
            await database_1.pool.query('UPDATE familiar SET nombre=$1, apellido=$2, id_tipoid=$3, email=$4,telefono=$5 WHERE id=$6', [nombre, apellido, tipoID, email, telefono, id]);
            await database_1.pool.query('UPDATE paciente_familiar SET parentesco=$1 WHERE id_paciente=$2 and id_familiar=$3', [parentesco, id_paciente, id]);
            return res.status(200).send('ACTUALIZADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async deleteFamiliar(req, res) {
        try {
            const { id_paciente, id_familiar } = req.body;
            await database_1.pool.query('DELETE FROM familiar WHERE id=$1', [id_familiar]);
            await database_1.pool.query('DELETE FROM paciente_familiar WHERE id_paciente=$1 and id_familiar=$2', [id_paciente, id_familiar]);
            return res.status(200).send('BORRADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}
const familiarController = new FamiliarController();
exports.default = familiarController;
