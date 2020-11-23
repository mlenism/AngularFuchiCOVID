"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class UbicacionProfesionalSaludController {
    async getUbicaciones(req, res) {
        try {
            const ubicaciones = await database_1.pool.query('SELECT * FROM ubicacion_profesional_salud ORDER BY (id_profesional_salud, id_barrio) ASC');
            return res.status(200).json(ubicaciones.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}
const ubicacionProfesionalSaludController = new UbicacionProfesionalSaludController();
exports.default = ubicacionProfesionalSaludController;
