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
}
const barriosController = new BarriosController();
exports.default = barriosController;
