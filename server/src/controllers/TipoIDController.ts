import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

class TipoIDController {

    public async getTipoIDs(req: Request, res: Response): Promise<Response> {
        try {
            const tipoIDs: QueryResult = await pool.query('SELECT * FROM tipoID ORDER BY id ASC');
            return res.status(200).json(tipoIDs.rows);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async getOne(req: Request, res: Response): Promise<Response> {
        try{
            const { id } = req.params;
            const barrio: QueryResult = await pool.query('SELECT * FROM tipoID WHERE id = $1', [id])            
            if(barrio.rows.length > 0){
                return res.status(200).json(barrio.rows)
            }else{
                return res.send('tipoID no encontrado')
            }           
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error')
        }
    }

    public async postTipoID(req: Request, res: Response): Promise<Response> {
        try {
            const { id, nombre } = req.body;
            await pool.query('INSERT INTO tipoID { id, nombre } VALUES { $1, $2}'),
                [id, nombre];
            return res.status(200).send('INSERTADO');            
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error')
        }
    }

    public async putTipoID(req: Request, res: Response): Promise<Response> {
        try {
            const{ id, nombre } = req.body;
            await pool.query('UPDATE tipoID SET nombre = $1 WHERE id = $2',
                [nombre, id])
            return res.status(200).send('ACTUALIZADO')
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async deleteTipoID(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.body;
            await pool.query('DELETE FROM tipoID WHERE id = $1', [id]);
            return res.status(200).send('ELIMINADO');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const tipoIDController = new TipoIDController();
export default tipoIDController;