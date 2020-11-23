"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class ProfesionalSaludController {
    async getProfesionalesFullName(req, res) {
        try {
            const profesionales = await database_1.pool.query(`SELECT id, (nombre || ' ' || apellido) AS "nombre" FROM profesional_salud ORDER BY id ASC`);
            return res.status(200).json(profesionales.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async getProfesionales(req, res) {
        try {
            // const profesionales: QueryResult = await pool.query('SELECT * FROM profesional_salud ORDER BY (id) ASC');
            // return res.status(200).json(profesionales.rows);
            const listaDePrueba = [
                {
                    id: "1244111111",
                    nombre: "nombre_profesional1",
                    apellido: "apellido_profesiona1",
                    contrasenia: "password1",
                    direccion: "Cra 1b #50-61",
                    barrio: "Terrón Colorado",
                    idBarrio: "1",
                    tipoID: "cedula de ciudadanía",
                    idTipoID: "1",
                    universidad: "Universidad Nacional de Colombia",
                    idUniversidad: "1",
                    entidad: "EPS Sura",
                    idEntidad: "1"
                },
                {
                    id: "1244222222",
                    nombre: "nombre_profesional2",
                    apellido: "apellido_profesiona2",
                    contrasenia: "password2",
                    direccion: "Cra 1b #50-61",
                    barrio: "Vista Hermosa",
                    idBarrio: "2",
                    tipoID: "cedula extranjera",
                    idTipoID: "2",
                    universidad: "Universidad de Antioquia",
                    idUniversidad: "2",
                    entidad: "Comfenalco valle",
                    idEntidad: "2"
                }
            ];
            return res.status(200).json(listaDePrueba);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async setProfesional(req, res) {
        try {
            // const { nombre, apellido, ... } = req.body;
            // await pool.query('INSERT INTO profesional_salud (nombre, apellido, ...) VALUES ($1, $2, $...)', [nombre, apellido, ...]);
            console.log(req.body);
            return res.status(200).send('INSERTADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async updateProfesional(req, res) {
        try {
            const { id, nombre, apellido, contrasenia, direccion, barrio, tipoID, universidad, entidad } = req.body;
            await database_1.pool.query('UPDATE profesional_salud SET nombre = $1, apellido = $2, id_tipoid = $3, id_universidad = $4, id_entidad = $5, contrasenia = $6 WHERE id = $7', [nombre, apellido, tipoID, universidad, entidad, contrasenia, id]);
            await database_1.pool.query('UPDATE ubicacion_profesional_salud SET id_barrio = $1, direccion = $2 WHERE id_profesional_salud = $3', [barrio, direccion, id]);
            return res.status(200).send('ACTUALIZADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async deleteProfesional(req, res) {
        try {
            const { id } = req.params;
            await database_1.pool.query('DELETE FROM profesional_salud WHERE id = $1', [id]);
            return res.status(200).send('BORRADO');
        }
        catch (e) {
            let men = 'update or delete on table "profesional_salud" violates foreign key constraint "FK_medico" on table "paciente"';
            if (e.message == men) {
                return res.status(200).send('CONSTRAINT "FK_medico"');
            }
            return res.status(500).json('Internal server error');
        }
    }
}
const profesionalSaludController = new ProfesionalSaludController();
exports.default = profesionalSaludController;
