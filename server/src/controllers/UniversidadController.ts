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

    public async getOne(req: Request, res: Response): Promise<Response> {
        try{
            const { id } = req.params;
            const universidad: QueryResult = await pool.query('SELECT * FROM universidad WHERE id = $1', [id])            
            if(universidad.rows.length > 0){
                return res.status(200).json(universidad.rows)
            }else{
                return res.send('Universidad no encontrada')
            }           
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error')
        }
    }

    public async postUniversidad(req: Request, res: Response): Promise<Response> {
        try {
            const { id, nombre } = req.body;
            await pool.query('INSERT INTO universidad { id, nombre } VALUES { $1, $2}'),
                [id, nombre];
            return res.status(200).send('INSERTADO');            
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error')
        }
    }

    public async putUniversidad(req: Request, res: Response): Promise<Response> {
        try {
            const{ id, nombre } = req.body;
            await pool.query('UPDATE universidad SET nombre = $1 WHERE id = $2',
                [nombre, id])
            return res.status(200).send('ACTUALIZADO')
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async deleteUniversidad(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.body;
            await pool.query('DELETE FROM universidad WHERE id = $1', [id]);
            return res.status(200).send('ELIMINADO');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const universidadController = new UniversidadController();
export default universidadController;