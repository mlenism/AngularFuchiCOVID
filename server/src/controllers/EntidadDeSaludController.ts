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

    public async getOne(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const entidadSalud: QueryResult = await pool.query('SELECT * FROM entidad_de_salud WHERE id = $1', [id]);
            if(entidadSalud.rows.length > 0){
                return res.status(200).json(entidadSalud.rows)
            }else{
                return res.send('Entidad de salud no encontrada')
            }

        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error')
        }
    }

    public async postEntidad(req: Request, res: Response): Promise<Response>{
        try {
            const { id, nombre } = req.body;
            await pool.query('INSERT INTO entidad_de_salud { id, nombre } VALUES { $1, $2}'),
                [id, nombre];
            return res.status(200).send('INSERTADO');            
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error')
        }
    }

    public async putEntidad(req: Request, res: Response): Promise<Response> {
        try {
            const{ id, nombre } = req.body;
            await pool.query('UPDATE entidad_de_salud SET nombre = $1 WHERE id = $2',
                [nombre, id])
            return res.status(200).send('ACTUALIZADO')
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async deleteEntidad(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.body;
            await pool.query('DELETE FROM entidad_de_salud WHERE id = $1', [id]);
            return res.status(200).send('ELIMINADO');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const entidadDeSaludController = new EntidadDeSaludController();
export default entidadDeSaludController;