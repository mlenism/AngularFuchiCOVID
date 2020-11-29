"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class VisitaController {
    async getVisitas(req, res) {
        try {
            const visitas = await database_1.pool.query('SELECT * FROM visita ORDER BY (id) ASC');
            return res.status(200).json(visitas.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const visita = await database_1.pool.query('SELECT * FROM visita WHERE id = $1', [id]);
            if (visita.rows.length > 0) {
                return res.status(200).json(visita.rows);
            }
            else {
                return res.send('Visita no encontrado');
            }
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async postVisita(req, res) {
        try {
            const { id, id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro, hora_registro } = req.body;
            await database_1.pool.query('INSERT INTO visita {id, id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro, hora_registro} VALUES {$1, $2, $3, $4, $5, $6, $7, $8, $9}'),
                [id, id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro, hora_registro];
            console.log(req.body);
            return res.status(200).send('INSERTADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async putVisita(req, res) {
        try {
            const { id, temperatura, peso, presion_arterial, observaciones, fecha_registro, hora_registro } = req.body;
            await database_1.pool.query('UPDATE visita SET temperatura = $1, peso = $2, presion_arterial = $3, observaciones = $4, fecha_registro = $5, hora_registro = $6'),
                [temperatura, peso, presion_arterial, observaciones, fecha_registro, hora_registro, id];
            console.log(req.body);
            return res.status(200).send('ACTUALIZADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async deleteVisita(req, res) {
        try {
            const { id } = req.body;
            await database_1.pool.query('DELETE FROM visita WHERE id = $1', [id]);
            console.log(req.body);
            return res.status(200).send('BORRADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}
const visitaController = new VisitaController();
exports.default = visitaController;
