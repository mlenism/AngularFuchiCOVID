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
}
const universidadController = new UniversidadController();
exports.default = universidadController;
