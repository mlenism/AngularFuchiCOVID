"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class LaboratorioController {
    async getLaboratorios(req, res) {
        try {
            const laboratorios = await database_1.pool.query('SELECT * FROM laboratorio ORDER BY id ASC');
            return res.status(200).json(laboratorios.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const laboratorio = await database_1.pool.query('SELECT * FROM laboratorio WHERE id = $1', [id]);
            if (laboratorio.rows.length > 0) {
                return res.status(200).json(laboratorio.rows);
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
    async postLaboratio(req, res) {
        try {
            const { id, nombre } = req.body;
            await database_1.pool.query('INSERT INTO laboratorio { id, nombre } VALUES { $1, $2}'),
                [id, nombre];
            return res.status(200).send('INSERTADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async putLaboratorio(req, res) {
        try {
            const { id, nombre } = req.body;
            await database_1.pool.query('UPDATE laboratorio SET nombre = $1 WHERE id = $2', [nombre, id]);
            return res.status(200).send('ACTUALIZADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async deleteLaboratorio(req, res) {
        try {
            const { id } = req.body;
            await database_1.pool.query('DELETE FROM laboratorio WHERE id = $1', [id]);
            return res.status(200).send('ELIMINADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}
const laboratorioController = new LaboratorioController();
exports.default = laboratorioController;
