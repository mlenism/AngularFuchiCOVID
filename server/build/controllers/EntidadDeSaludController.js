"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class EntidadDeSaludController {
    async getEntidadesDeSalud(req, res) {
        try {
            const entidadesDeSalud = await database_1.pool.query('SELECT * FROM entidad_de_salud ORDER BY id ASC');
            return res.status(200).json(entidadesDeSalud.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const entidadSalud = await database_1.pool.query('SELECT * FROM entidad_de_salud WHERE id = $1', [id]);
            if (entidadSalud.rows.length > 0) {
                return res.status(200).json(entidadSalud.rows);
            }
            else {
                return res.send('Entidad de salud no encontrada');
            }
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async postEntidad(req, res) {
        try {
            const { id, nombre } = req.body;
            await database_1.pool.query('INSERT INTO entidad_de_salud { id, nombre } VALUES { $1, $2}'),
                [id, nombre];
            return res.status(200).send('INSERTADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async putEntidad(req, res) {
        try {
            const { id, nombre } = req.body;
            await database_1.pool.query('UPDATE entidad_de_salud SET nombre = $1 WHERE id = $2', [nombre, id]);
            return res.status(200).send('ACTUALIZADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async deleteEntidad(req, res) {
        try {
            const { id } = req.body;
            await database_1.pool.query('DELETE FROM entidad_de_salud WHERE id = $1', [id]);
            return res.status(200).send('ELIMINADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}
const entidadDeSaludController = new EntidadDeSaludController();
exports.default = entidadDeSaludController;
