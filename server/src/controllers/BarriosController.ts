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

    public async getOne(req: Request, res: Response): Promise<Response> {
        try{
            const { id } = req.params;
            const barrio: QueryResult = await pool.query('SELECT * FROM barrio WHERE id = $1', [id])            
            if(barrio.rows.length > 0){
                return res.status(200).json(barrio.rows)
            }else{
                return res.send('Barrio no encontrado')
            }           
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error')
        }
    }

    public async postBarrio(req: Request, res: Response): Promise<Response> {
        try {
            const { id, nombre } = req.body;
            await pool.query('INSERT INTO barrio { id, nombre } VALUES { $1, $2}'),
                [id, nombre];
            return res.status(200).send('INSERTADO');            
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error')
        }
    }

    public async putBarrio(req: Request, res: Response): Promise<Response> {
        try {
            const{ id, nombre } = req.body;
            await pool.query('UPDATE barrio SET nombre = $1 WHERE id = $2',
                [nombre, id])
            return res.status(200).send('ACTUALIZADO')
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async deleteBarrio(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.body;
            await pool.query('DELETE FROM barrio WHERE id = $1', [id]);
            return res.status(200).send('ELIMINADO');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const barriosController = new BarriosController();
export default barriosController;