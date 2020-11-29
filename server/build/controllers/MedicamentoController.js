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
}
const medicamentoController = new MedicamentoController();
exports.default = medicamentoController;
