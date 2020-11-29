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

    public async getOne(req: Request, res: Response): Promise<Response> {
        try{
            const { id } = req.params;
            const laboratorio: QueryResult = await pool.query('SELECT * FROM laboratorio WHERE id = $1', [id])            
            if(laboratorio.rows.length > 0){
                return res.status(200).json(laboratorio.rows)
            }else{
                return res.send('Barrio no encontrado')
            }           
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error')
        }
    }

    public async postLaboratio(req: Request, res: Response): Promise<Response> {
        try {
            const { id, nombre } = req.body;
            await pool.query('INSERT INTO laboratorio { id, nombre } VALUES { $1, $2}'),
                [id, nombre];
            return res.status(200).send('INSERTADO');            
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error')
        }
    }

    public async putLaboratorio(req: Request, res: Response): Promise<Response> {
        try {
            const{ id, nombre } = req.body;
            await pool.query('UPDATE laboratorio SET nombre = $1 WHERE id = $2',
                [nombre, id])
            return res.status(200).send('ACTUALIZADO')
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async deleteLaboratorio(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.body;
            await pool.query('DELETE FROM laboratorio WHERE id = $1', [id]);
            return res.status(200).send('ELIMINADO');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const laboratorioController = new LaboratorioController();
export default laboratorioController;