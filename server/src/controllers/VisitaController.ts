import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

class VisitaController {

    public async getVisitas(req: Request, res: Response): Promise<Response> {
        try {
            const { medico } = req.body;
            // const visitas: QueryResult = await pool.query('SELECT * FROM visita ORDER BY (id) ASC');
            // return res.status(200).json(visitas.rows);
            const visitas: QueryResult = await pool.query('select vis.id,'
            +'id_profesional_salud as "idProfesional", '
            +'id_paciente as "idpaciente",'
            +'pac.nombre as paciente,'
            +'temperatura,'
            +'peso,' 
            +'presion_arterial as "presionArterial",'
            +'fecha_registro as fecha, '
            +'hora_registro as hora,'
            +'med.nombre as medicamento,'
            +'med.id as "idMedicamento",'
            +'lab.nombre as laboratorio,'
            +'lab.id as "idlaboratorio",'
            +'dosis_diaria as "dosisDiaria",'
            +'observaciones '
            
            +'from visita as vis join paciente as pac on pac.id=vis.id_paciente '
            +'join visita_dosis_diaria as visdosis on vis.id=visdosis.id_visita '
            +'join medicamento as med on med.id=id_medicamento '
            +'join laboratorio as lab on lab.id=visdosis.id_laboratorio WHERE vis.id_profesional_salud=$1'
             +' ORDER BY (id) ASC', [medico]);
            return res.status(200).json(visitas.rows);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async getVisitaPacientes(req: Request, res: Response): Promise<Response> {
        try {

             const visitas: QueryResult = await pool.query(`select id, (nombre||' '||apellido) as nombre from paciente ORDER BY (id) ASC`);
             return res.status(200).json(visitas.rows);
            
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async setVisita(req: Request, res: Response): Promise<Response> {
        try {
             const { doctor, paciente, temperatura, peso, presion, laboratorio, medicamento, dosis, observaciones } = req.body;
             await pool.query('insert into visita (id_paciente, id_profesional_salud,temperatura,peso,presion_arterial,observaciones) VALUES ($1, $2, $3, $4, $5, $6)', [paciente, doctor, temperatura, peso, presion, observaciones]);
             await pool.query('insert into visita_dosis_diaria (id_laboratorio,id_medicamento,dosis_diaria) VALUES ($1, $2, $3)', [laboratorio, medicamento, dosis]);
            console.log(req.body);
            return res.status(200).send('INSERTADO');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async updateVisita(req: Request, res: Response): Promise<Response> {
        try {
            console.log(req.body);
            return res.status(200).send('ACTUALIZADO');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async deleteVisita(req: Request, res: Response): Promise<Response> {
        try {
            const { id_paciente, id_doctor } = req.body;
            console.log(req.body);
            return res.status(200).send('BORRADO');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const visitaController = new VisitaController();
export default visitaController;