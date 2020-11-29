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

    public async getOne(req: Request, res: Response): Promise<Response> {
        try{
            const { id } = req.params;
            const medicamento: QueryResult = await pool.query('SELECT * FROM medicanto WHERE id = $1', [id])            
            if(medicamento.rows.length > 0){
                return res.status(200).json(medicamento.rows)
            }else{
                return res.send('Medicamento no encontrado')
            }           
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error')
        }
    }

    public async postMedicamento(req: Request, res: Response): Promise<Response> {
        try {
            const { id, nombre } = req.body;
            await pool.query('INSERT INTO medicamento { id, nombre } VALUES { $1, $2}'),
                [id, nombre];
            return res.status(200).send('INSERTADO');            
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error')
        }
    }

    public async putMedicamento(req: Request, res: Response): Promise<Response> {
        try {
            const{ id, nombre } = req.body;
            await pool.query('UPDATE medicamento SET nombre = $1 WHERE id = $2',
                [nombre, id])
            return res.status(200).send('ACTUALIZADO')
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async deleteMedicamento(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.body;
            await pool.query('DELETE FROM medicamento WHERE id = $1', [id]);
            return res.status(200).send('ELIMINADO');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

}

const medicamentoController = new MedicamentoController();
export default medicamentoController;