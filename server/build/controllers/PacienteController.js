"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class PacienteController {
    async getPacientes(req, res) {
        try {
            const pacientes = await database_1.pool.query('SELECT pac.id,'
                + 'pac.nombre,'
                + 'pac.apellido,'
                + 'prof.nombre as medico,'
                + 'prof.id as "idMedico",'
                + 'ubic.direccion,'
                + 'barr.nombre as barrio,'
                + 'ubic.id_barrio as "idBarrio",'
                + 'ubic.latitud,'
                + 'ubic.longitud,'
                + 'tipo.nombre as "tipoID",'
                + 'pac.id_tipoid as "idTipoID",'
                + 'pac.numerodeintegrantes as integrantes,'
                + 'pac.ciudad_contagio as ciudad '
                + 'from paciente as pac join ubicacion_paciente as ubic on pac.id=ubic.id_paciente '
                + 'join barrio as barr on ubic.id_barrio=barr.id '
                + 'join tipoid as tipo on pac.id_tipoid=tipo.id '
                + 'join profesional_salud as prof on pac.id_medico=prof.id');
            return res.status(200).json(pacientes.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async setPacientes(req, res) {
        try {
            const { id_miembro_secretaria, id, nombre, apellido, medico, direccion, barrio, tipoID, integrantes, ciudad, latitud, longitud } = req.body;
            await database_1.pool.query('INSERT INTO paciente (id, nombre, apellido, id_tipoid, numerodeintegrantes, ciudad_contagio, id_medico) '
                + 'VALUES ($1, $2, $3, $4, $5, $6, $7)', [id, nombre, apellido, tipoID, integrantes, ciudad, medico]);
            await database_1.pool.query('INSERT INTO registro_paciente (id_miembro_secretaria_salud, id_paciente) VALUES ($1, $2)', [id_miembro_secretaria, id]);
            await database_1.pool.query('INSERT INTO ubicacion_paciente (id_paciente, id_barrio, direccion, latitud, longitud) VALUES ($1,$2,$3,$4,$5)', [id, barrio, direccion, latitud, longitud]);
            return res.status(200).send('INSERTADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async updatePacientes(req, res) {
        try {
            const { id_miembro_secretaria, id, nombre, apellido, medico, direccion, barrio, tipoID, integrantes, ciudad, latitud, longitud } = req.body;
            await database_1.pool.query('UPDATE paciente SET nombre = $1, apellido = $2, id_tipoid = $3, numerodeintegrantes = $4, ciudad_contagio = $5, id_medico = $6 '
                + 'WHERE id = $7', [nombre, apellido, tipoID, integrantes, ciudad, medico, id]);
            await database_1.pool.query('UPDATE ubicacion_paciente SET id_barrio = $1, direccion = $2, latitud = $3, longitud = $4 WHERE id_paciente = $5', [barrio, direccion, latitud, longitud, id]);
            return res.status(200).send('ACTUALIZADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async deletePaciente(req, res) {
        try {
            const { id } = req.params;
            await database_1.pool.query('DELETE FROM paciente WHERE id = $1', [id]);
            return res.status(200).send('BORRADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}
const pacienteController = new PacienteController();
exports.default = pacienteController;
