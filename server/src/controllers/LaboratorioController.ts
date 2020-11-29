import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

class LaboratorioController {

    public async getLaboratorios(req: Request, res: Response): Promise<Response> {
        try {
            const laboratorios: QueryResult = await pool.query('SELECT * FROM laboratorio ORDER BY id ASC');
            return res.status(200).json(laboratorios.rows);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const laboratorioController = new LaboratorioController();
export default laboratorioController;