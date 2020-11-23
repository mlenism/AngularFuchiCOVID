import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

class BarriosController {

    public async getBarrios(req: Request, res: Response): Promise<Response> {
        try {
            const barrios: QueryResult = await pool.query('SELECT * FROM barrio ORDER BY id ASC');
            return res.status(200).json(barrios.rows);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const barriosController = new BarriosController();
export default barriosController;