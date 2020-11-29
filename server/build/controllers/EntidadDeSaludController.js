"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class EntidadDeSaludController {
    async getEntidadesDeSalud(req, res) {
        try {
            const entidadesDeSalud = await database_1.pool.query('SELECT * FROM entidad_de_salud ORDER BY id ASC');
            return res.status(200).json(entidadesDeSalud.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}
const entidadDeSaludController = new EntidadDeSaludController();
exports.default = entidadDeSaludController;
