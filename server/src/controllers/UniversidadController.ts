import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

class UniversidadController {

    public async getUniversidades(req: Request, res: Response): Promise<Response> {
        try {
            const universidades: QueryResult = await pool.query('SELECT * FROM universidad ORDER BY id ASC');
            return res.status(200).json(universidades.rows);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const universidadController = new UniversidadController();
export default universidadController;