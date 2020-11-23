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
            // const labMedicamentos: QueryResult = await pool.query('select * from laboratorio_medicamento ORDER BY (id_laboratorio, id_medicamento)');
            // return res.status(200).json(labMedicamentos.rows);
            const listaPrueba = [
                {
                    "laboratorio": "labo1",
                    "id_medicamento": "1",
                    "stock": 110
                },
                {
                    "laboratorio": "labo1",
                    "id_medicamento": "2",
                    "stock": 120
                },
                {
                    "laboratorio": "labo1",
                    "id_medicamento": "3",
                    "stock": 130
                },
                {
                    "laboratorio": "labo2",
                    "id_medicamento": "1",
                    "stock": 140
                },
                {
                    "laboratorio": "labo2",
                    "id_medicamento": "2",
                    "stock": 150
                },
                {
                    "laboratorio": "labo2",
                    "id_medicamento": "3",
                    "stock": 160
                },
                {
                    "laboratorio": "labo3",
                    "id_medicamento": "1",
                    "stock": 170
                },
                {
                    "laboratorio": "labo3",
                    "id_medicamento": "2",
                    "stock": 180
                },
                {
                    "laboratorio": "labo3",
                    "id_medicamento": "3",
                    "stock": 190
                },
                {
                    "laboratorio": "labo4",
                    "id_medicamento": "1",
                    "stock": 200
                },
                {
                    "laboratorio": "labo4",
                    "id_medicamento": "2",
                    "stock": 210
                },
                {
                    "laboratorio": "labo4",
                    "id_medicamento": "3",
                    "stock": 220
                }
            ];
            return res.status(200).json(listaPrueba);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}
const laboratorioMedicamentoController = new LaboratorioMedicamentoController();
exports.default = laboratorioMedicamentoController;
