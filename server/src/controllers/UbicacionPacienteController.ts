import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';
import pacienteController from './PacienteController';

class UbicacionPacienteController {

    public async getUbicacion(req: Request, res: Response): Promise<Response> {
        try {
            const ubicacion: QueryResult = await pool.query('SELECT * FROM ubicacion_paciente ORDER BY (id_paciente) ASC')
            return res.status(200).json(ubicacion.rows);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }    
    }
}

const ubicacionPacienteController = new UbicacionPacienteController();
export default ubicacionPacienteController;