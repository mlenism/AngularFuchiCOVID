"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class UniversidadController {
    async getUniversidades(req, res) {
        try {
            const universidades = await database_1.pool.query('SELECT * FROM universidad ORDER BY id ASC');
            return res.status(200).json(universidades.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const universidad = await database_1.pool.query('SELECT * FROM universidad WHERE id = $1', [id]);
            if (universidad.rows.length > 0) {
                return res.status(200).json(universidad.rows);
            }
            else {
                return res.send('Universidad no encontrada');
            }
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async postUniversidad(req, res) {
        try {
            const { id, nombre } = req.body;
            await database_1.pool.query('INSERT INTO universidad { id, nombre } VALUES { $1, $2}'),
                [id, nombre];
            return res.status(200).send('INSERTADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async putUniversidad(req, res) {
        try {
            const { id, nombre } = req.body;
            await database_1.pool.query('UPDATE universidad SET nombre = $1 WHERE id = $2', [nombre, id]);
            return res.status(200).send('ACTUALIZADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async deleteUniversidad(req, res) {
        try {
            const { id } = req.body;
            await database_1.pool.query('DELETE FROM universidad WHERE id = $1', [id]);
            return res.status(200).send('ELIMINADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}
const universidadController = new UniversidadController();
exports.default = universidadController;
