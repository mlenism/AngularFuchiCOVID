"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class LaboratorioMedicamentoController {
    async getStock(req, res) {
        try {
            const { id_laboratorio, id_medicamento } = req.body;
            const labMedicamentos = await database_1.pool.query('SELECT stock FROM laboratorio_medicamento WHERE id_laboratorio = $1 AND id_medicamento = $2', [id_laboratorio, id_medicamento]);
            return res.status(200).json(labMedicamentos.rows[0]);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async getLabMedicametos(req, res) {
        try {
            const labMedicamentos = await database_1.pool.query('SELECT lab.nombre as laboratorio, '
                + 'labme.id_medicamento,'
                + 'labme.stock '
                + 'from laboratorio as lab '
                + 'join laboratorio_medicamento as labme on labme.id_laboratorio=lab.id '
                + 'order by labme.id_laboratorio, labme.id_medicamento');
            return res.status(200).json(labMedicamentos.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}
const laboratorioMedicamentoController = new LaboratorioMedicamentoController();
exports.default = laboratorioMedicamentoController;
