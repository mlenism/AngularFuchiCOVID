"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class PacienteFamiliarController {
    async getFamiliares(req, res) {
        try {
            const familiares = await database_1.pool.query('SELECT * FROM paciente_familiar ORDER BY (id_paciente, id_familiar) ASC');
            return res.status(200).json(familiares.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}
const pacienteFamiliarController = new PacienteFamiliarController();
exports.default = pacienteFamiliarController;
