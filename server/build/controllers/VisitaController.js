"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class VisitaController {
    async getVisitas(req, res) {
        try {
            const { medico } = req.body;
            const visitas = await database_1.pool.query('select vis.id,'
                + 'id_profesional_salud as "idProfesional", '
                + 'id_paciente as "idpaciente",'
                + 'pac.nombre as paciente,'
                + 'temperatura,'
                + 'peso,'
                + 'presion_arterial as "presionArterial",'
                + 'fecha_registro as fecha, '
                + 'hora_registro as hora,'
                + 'med.nombre as medicamento,'
                + 'med.id as "idMedicamento",'
                + 'lab.nombre as laboratorio,'
                + 'lab.id as "idlaboratorio",'
                + 'dosis_diaria as "dosisDiaria",'
                + 'observaciones '
                + 'from visita as vis join paciente as pac on pac.id=vis.id_paciente '
                + 'join visita_dosis_diaria as visdosis on vis.id=visdosis.id_visita '
                + 'join medicamento as med on med.id=id_medicamento '
                + 'join laboratorio as lab on lab.id=visdosis.id_laboratorio WHERE vis.id_profesional_salud=$1'
                + ' ORDER BY (id) ASC', [medico]);
            return res.status(200).json(visitas.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async getVisitaPacientes(req, res) {
        try {
            const visitas = await database_1.pool.query(`select id, (nombre||' '||apellido) as nombre from paciente ORDER BY (id) ASC`);
            return res.status(200).json(visitas.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
    async setVisita(req, res) {
        try {
            const { doctor, paciente, temperatura, peso, presion, laboratorio, medicamento, dosis, observaciones } = req.body;
            await database_1.pool.query('INSERT INTO visita (id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones) '
                + 'VALUES ($1, $2, $3, $4, $5, $6, $7)', [paciente, doctor, temperatura, peso, presion, observaciones]);
            await database_1.pool.query('INSERT INTO visita_paciente (id_visita, id_laboratorio, id_medicamento, dosis_diaria) '
                + 'VALUES ($1,$2,$3,$4)', []);
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
            //RECUERDEN IMPLEMENTAR EL ID DE LA VISITA PARA ACTUALIZAR POR VISITA
            //TAMBIEN RECORDAR QUE EL id_visita DE LA TABLA visita_dosis_diaria ES UNA
            //FK, POR TANTO DEBEMOS RECIBIRLA Y NO CREARLA
            // const {id, doctor, paciente, temperatura, peso, presion, laboratorio, medicamento, dosis, observaciones} = req.body;
            // await pool.query('UPDATE visita SET temperatura=$1, peso=$2, presion_arterial=$3, observaciones=$4 '
            //     + 'WHERE id_visita = $5', [paciente, doctor, temperatura, peso, presion, observaciones, id]);
            // await pool.query('UPDATE visita_paciente SET dosis_diaria=$1, WHERE id_visita=$2', [id])
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
            const { id, id_paciente, id_doctor } = req.body;
            await database_1.pool.query('DELETE FROM visita WHERE id=$1', [id]);
            await database_1.pool.query('DELETE FROM visita_dosis_diaria WHERE id_paciente=$1 and id_doctor=$2', [id_paciente, id_doctor]);
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
