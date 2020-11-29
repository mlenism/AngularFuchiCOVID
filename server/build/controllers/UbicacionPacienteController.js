"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class UbicacionPacienteController {
    async getUbicacion(req, res) {
        try {
            const ubicacion = await database_1.pool.query('SELECT * FROM ubicacion_paciente ORDER BY (id_paciente) ASC');
            return res.status(200).json(ubicacion.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async getOne(req, res) {
        try {
            const { id_paciente } = req.params;
            const ubicacion = await database_1.pool.query('SELECT * FROM ubicacion_paciente WHERE id_paciente = $1', [id_paciente]);
            if (ubicacion.rows.length > 0) {
                return res.status(200).json(ubicacion.rows);
            }
            else {
                return res.send('Paciente no encontrado');
            }
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async postUbicacion(req, res) {
        try {
            const { id_paciente, idbarrio, direccion, altitud, longitud } = req.body;
            await database_1.pool.query('INSERT INTO ubicacion_paciente {id_paciente, idbarrio, direccion, altitud, longitud} VALUES{$1, $2, $3, $4, $5}'),
                [id_paciente, idbarrio, direccion, altitud, longitud];
            console.log(req.body);
            return res.status(200).send('INSERTADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async putUbicacion(req, res) {
        try {
            const { id_paciente, idbarrio, direccion, altitud, longitud } = req.body;
            await database_1.pool.query('UPDATE ubicacion_paciente idbarrio = $1, direccion = $2, altitud = $3, longitud = $4 WHERE id_paciente = $5}'),
                [idbarrio, direccion, altitud, longitud, id_paciente];
            console.log(req.body);
            return res.status(200).send('ACTUALIZADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}
const ubicacionPacienteController = new UbicacionPacienteController();
exports.default = ubicacionPacienteController;
