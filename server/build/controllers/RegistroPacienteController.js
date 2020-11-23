"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class RegistroPacienteController {
    async getRegistros(req, res) {
        try {
            const registros = await database_1.pool.query('SELECT * FROM registro_paciente ORDER BY (id_miembro_secretaria_salud, id_paciente) ASC');
            return res.status(200).json(registros.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}
const registroPacienteController = new RegistroPacienteController();
exports.default = registroPacienteController;
