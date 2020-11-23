import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

class MedicamentoController {

    public async getMedicamentos(req: Request, res: Response): Promise<Response> {
        try {
            const medicamentos: QueryResult = await pool.query('SELECT * FROM medicamento ORDER BY id ASC');
            return res.status(200).json(medicamentos.rows);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const medicamentoController = new MedicamentoController();
export default medicamentoController;