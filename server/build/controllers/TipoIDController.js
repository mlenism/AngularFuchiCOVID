"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class TipoIDController {
    async getTipoIDs(req, res) {
        try {
            const tipoIDs = await database_1.pool.query('SELECT * FROM tipoid ORDER BY id ASC');
            return res.status(200).json(tipoIDs.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}
const tipoIDController = new TipoIDController();
exports.default = tipoIDController;
