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
}
const laboratorioController = new LaboratorioController();
exports.default = laboratorioController;
