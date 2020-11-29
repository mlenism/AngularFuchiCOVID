import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

class EntidadDeSaludController {

    public async getEntidadesDeSalud(req: Request, res: Response): Promise<Response> {
        try {
            const entidadesDeSalud: QueryResult = await pool.query('SELECT * FROM entidad_de_salud ORDER BY id ASC');
            return res.status(200).json(entidadesDeSalud.rows);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const entidadDeSaludController = new EntidadDeSaludController();
export default entidadDeSaludController;