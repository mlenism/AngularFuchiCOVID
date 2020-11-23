"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VisitaController {
    async getVisitas(req, res) {
        try {
            // const visitas: QueryResult = await pool.query('SELECT * FROM visita ORDER BY (id) ASC');
            // return res.status(200).json(visitas.rows);
            const listaDePrueba = [
                {
                    id: '1',
                    idProfesional: '1244111111',
                    idpaciente: '1344111111',
                    paciente: 'nombre_paciente1 apellido_paciente1',
                    temperatura: '36.25',
                    peso: '60',
                    presionArterial: '155/80',
                    fecha: '2020-11-23',
                    hora: '07:42:50.238542',
                    medicamento: 'Mixamorranilo300',
                    idMedicamento: '1',
                    laboratorio: 'labo1',
                    idlaboratorio: '1',
                    dosisDiaria: '2',
                    observaciones: 'ninguna'
                }
            ];
            return res.status(200).json(listaDePrueba);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async getVisitaPacientes(req, res) {
        try {
            // const visitas: QueryResult = await pool.query('SELECT * FROM visita ORDER BY (id) ASC');
            // return res.status(200).json(visitas.rows);
            const listaDePrueba = [
                {
                    id: '1344111111',
                    nombre: 'nombre_paciente1 apellido_paciente1'
                },
                {
                    id: '1344222222',
                    nombre: 'nombre_paciente2 apellido_paciente2'
                },
                {
                    id: '1344333333',
                    nombre: 'nombre_paciente3 apellido_paciente3'
                },
                {
                    id: '1344444444',
                    nombre: 'nombre_paciente2 apellido_paciente3'
                }
            ];
            return res.status(200).json(listaDePrueba);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async setVisita(req, res) {
        try {
            console.log(req.body);
            return res.status(200).send('INSERTADO');
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async updateVisita(req, res) {
        try {
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
            const { id_paciente, id_doctor } = req.body;
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
