"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class VisitaDosisDiariaController {
    async getDosisDiarias(req, res) {
        try {
            const dosis = await database_1.pool.query('SELECT * FROM visita_dosis_diaria ORDER BY (id_visita, id_medicamento) ASC');
            return res.status(200).json(dosis.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}
const visitaDosisDiariaController = new VisitaDosisDiariaController();
exports.default = visitaDosisDiariaController;
