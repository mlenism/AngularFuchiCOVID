"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class MedicamentoController {
    async getMedicamentos(req, res) {
        try {
            const medicamentos = await database_1.pool.query('SELECT * FROM medicamento ORDER BY id ASC');
            return res.status(200).json(medicamentos.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const medicamento = await database_1.pool.query('SELECT * FROM medicanto WHERE id = $1', [id]);
            if (medicamento.rows.length > 0) {
                return res.status(200).json(medicamento.rows);
            }
            else {
                return res.send('Medicamento no encontrado');
            }
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async postMedicamento(req, res) {
        try {
            const { id, nombre } = req.body;
            await database_1.pool.query('INSERT INTO medicamento { id, nombre } VALUES { $1, $2}'),
                [id, nombre];
            return res.status(200).send('INSERTADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async putMedicamento(req, res) {
        try {
            const { id, nombre } = req.body;
            await database_1.pool.query('UPDATE medicamento SET nombre = $1 WHERE id = $2', [nombre, id]);
            return res.status(200).send('ACTUALIZADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async deleteMedicamento(req, res) {
        try {
            const { id } = req.body;
            await database_1.pool.query('DELETE FROM medicamento WHERE id = $1', [id]);
            return res.status(200).send('ELIMINADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}
const medicamentoController = new MedicamentoController();
exports.default = medicamentoController;
