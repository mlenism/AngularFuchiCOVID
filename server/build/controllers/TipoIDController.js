"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class TipoIDController {
    async getTipoIDs(req, res) {
        try {
            const tipoIDs = await database_1.pool.query('SELECT * FROM tipoID ORDER BY id ASC');
            return res.status(200).json(tipoIDs.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const barrio = await database_1.pool.query('SELECT * FROM tipoID WHERE id = $1', [id]);
            if (barrio.rows.length > 0) {
                return res.status(200).json(barrio.rows);
            }
            else {
                return res.send('tipoID no encontrado');
            }
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async postTipoID(req, res) {
        try {
            const { id, nombre } = req.body;
            await database_1.pool.query('INSERT INTO tipoID { id, nombre } VALUES { $1, $2}'),
                [id, nombre];
            return res.status(200).send('INSERTADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async putTipoID(req, res) {
        try {
            const { id, nombre } = req.body;
            await database_1.pool.query('UPDATE tipoID SET nombre = $1 WHERE id = $2', [nombre, id]);
            return res.status(200).send('ACTUALIZADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async deleteTipoID(req, res) {
        try {
            const { id } = req.body;
            await database_1.pool.query('DELETE FROM tipoID WHERE id = $1', [id]);
            return res.status(200).send('ELIMINADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}
const tipoIDController = new TipoIDController();
exports.default = tipoIDController;
