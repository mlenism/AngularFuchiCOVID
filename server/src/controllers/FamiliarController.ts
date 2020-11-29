import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

class FamiliarController {

    public async getFamiliares(req: Request, res: Response): Promise<Response> {
        try {
            const familiares: QueryResult = await pool.query('SELECT * FROM familiar ORDER BY id ASC');
            return res.status(200).json(familiares.rows);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async getOne(req: Request, res: Response): Promise<Response> {
        try{
            const { id } = req.params;
            const familiar: QueryResult = await pool.query('SELECT * FROM familiar WHERE id = $1', [id])
            if(familiar.rows.length > 0){
                return res.status(200).json(familiar.rows)
            }else{
                return res.send('Familiar no encontrado')
            }
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }    

    public async postFamiliar(req: Request, res: Response): Promise<Response> {
        try {
            const { id, nombre, apellido, id_tipoID, email, telefono} = req.body;
            await pool.query('INSERT INTO familiar {id, nombre, apelido, id_tipoID, email, telefono} VALUES {$1, $2, $3, $4, $5, $6}'),
                [id, nombre, apellido, id_tipoID, email, telefono];
            console.log(req.body);
            return res.status(200).send('INSERTADO');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async putFamiliar(req: Request, res: Response): Promise<Response> {
        try {
            const { id, nombre, apellido, id_tipoID, email, telefono} = req.body;
            await pool.query('UPDATE familiar SET nombre = $1, apellido = $2, id_tipoID = $3, email = $4, telefono = $5 WHERE id = $6'),
                [nombre, apellido, id_tipoID, email, telefono, id];
            console.log(req.body);
            return res.status(200).send('ACTUALIZADO');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async deleteFamiliar(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.body;
            await pool.query('DELETE FROM familiar WHERE id = $1', [id])
            console.log(req.body);
            return res.status(200).send('BORRADO');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const familiarController = new FamiliarController();
export default familiarController;