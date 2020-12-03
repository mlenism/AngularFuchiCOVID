import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

class LaboratorioMedicamentoController {

    public async getStock(req: Request, res: Response): Promise<Response> {
        try {
            const { id_laboratorio, id_medicamento } = req.body;
            const labMedicamentos: QueryResult = await pool.query('SELECT stock FROM laboratorio_medicamento WHERE id_laboratorio = $1 AND id_medicamento = $2', [id_laboratorio, id_medicamento]);
            return res.status(200).json(labMedicamentos.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async getLabMedicametos(req: Request, res: Response): Promise<Response> {
        try {
            const labMedicamentos: QueryResult = await pool.query('SELECT lab.nombre as laboratorio, '
                +'labme.id_medicamento,'
                +'labme.stock '
            
                +'from laboratorio as lab '
                +'join laboratorio_medicamento as labme on labme.id_laboratorio=lab.id');
            return res.status(200).json(labMedicamentos.rows);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const laboratorioMedicamentoController = new LaboratorioMedicamentoController();
export default laboratorioMedicamentoController;