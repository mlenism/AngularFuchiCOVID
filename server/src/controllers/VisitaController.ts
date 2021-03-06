import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

class VisitaController {

    public async getVisitas(req: Request, res: Response): Promise<Response> {
        try {
            const { medico } = req.body;
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
            const {doctor, paciente, temperatura, peso, presion, laboratorio, medicamento, dosis, observaciones} = req.body;
            await pool.query('SELECT f_setVisita($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
            [paciente, doctor, temperatura, peso, presion, observaciones, laboratorio, medicamento, dosis]);
            console.log(req.body);
            return res.status(200).send('INSERTADO');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async updateVisita(req: Request, res: Response): Promise<Response> {
        try {
            //RECUERDEN IMPLEMENTAR EL ID DE LA VISITA PARA ACTUALIZAR POR VISITA

            //TAMBIEN RECORDAR QUE EL id_visita DE LA TABLA visita_dosis_diaria ES UNA
            //FK, POR TANTO DEBEMOS RECIBIRLA Y NO CREARLA
            const {id, doctor, paciente, temperatura, peso, presion, laboratorio, medicamento, dosis, observaciones} = req.body;
            await pool.query('UPDATE visita SET id_paciente=$1, temperatura=$2, peso=$3, presion_arterial=$4, observaciones=$5 '
                + 'WHERE id = $6', [paciente, temperatura, peso, presion, observaciones, id]);
            await pool.query('UPDATE visita_dosis_diaria SET id_laboratorio = $1, id_medicamento = $2, dosis_diaria = $3 WHERE id_visita = $4', [laboratorio, medicamento, dosis, id])
            console.log(req.body);
            return res.status(200).send('ACTUALIZADO');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async deleteVisita(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.body;
            await pool.query('DELETE FROM visita WHERE id=$1', [id])
            await pool.query('DELETE FROM visita_dosis_diaria WHERE id_visita=$1', [id]) 
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