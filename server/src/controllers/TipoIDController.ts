import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

class TipoIDController {

    public async getTipoIDs(req: Request, res: Response): Promise<Response> {
        try {
            const tipoIDs: QueryResult = await pool.query('SELECT * FROM tipoid ORDER BY id ASC');
            return res.status(200).json(tipoIDs.rows);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const tipoIDController = new TipoIDController();
export default tipoIDController;