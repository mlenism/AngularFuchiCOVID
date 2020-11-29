"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class BarriosController {
    async getBarrios(req, res) {
        try {
            const barrios = await database_1.pool.query('SELECT * FROM barrio ORDER BY id ASC');
            return res.status(200).json(barrios.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const barrio = await database_1.pool.query('SELECT * FROM barrio WHERE id = $1', [id]);
            if (barrio.rows.length > 0) {
                return res.status(200).json(barrio.rows);
            }
            else {
                return res.send('Barrio no encontrado');
            }
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async postBarrio(req, res) {
        try {
            const { id, nombre } = req.body;
            await database_1.pool.query('INSERT INTO barrio { id, nombre } VALUES { $1, $2}'),
                [id, nombre];
            return res.status(200).send('INSERTADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async putBarrio(req, res) {
        try {
            const { id, nombre } = req.body;
            await database_1.pool.query('UPDATE barrio SET nombre = $1 WHERE id = $2', [nombre, id]);
            return res.status(200).send('ACTUALIZADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async deleteBarrio(req, res) {
        try {
            const { id } = req.body;
            await database_1.pool.query('DELETE FROM barrio WHERE id = $1', [id]);
            return res.status(200).send('ELIMINADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}
const barriosController = new BarriosController();
exports.default = barriosController;
