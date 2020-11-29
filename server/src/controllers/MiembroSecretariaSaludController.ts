import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

class MiembroSecretariaSaludController {

    public async getMiembros(req: Request, res: Response): Promise<Response> {
        try {
            const miembros: QueryResult = await pool.query('SELECT * FROM miembro_secretaria_salud ORDER BY id ASC');
            return res.status(200).json(miembros.rows);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async singIn(req: Request, res: Response): Promise<Response> {
        try {
            const { id, password } = req.body;
            let miembros: QueryResult = await pool.query('SELECT id, nombre, apellido FROM miembro_secretaria_salud WHERE id = $1 AND contrasenia = $2', [id, password]);
            if (miembros.rows.length == 0) {
                miembros = await pool.query('SELECT id, nombre, apellido FROM profesional_salud WHERE id = $1 AND contrasenia = $2', [id, password]);
                if (miembros.rows.length == 0) {
                    return res.status(200).json('Usuario o contraseña incorrecto');
                }
                const miembro = miembros.rows[0];
                return res.status(200).json({miembro, tipo: "medico"});
            }
            const miembro = miembros.rows[0];
            return res.status(200).json({miembro, tipo: "secretaria"});
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async getOne(req: Request, res: Response): Promise<Response> {
        try{
            const { id } = req.params;
            const secretaria_salud: QueryResult = await pool.query('SELECT * FROM miembro_secretaria_salud WHERE id = $1', [id])
            if(secretaria_salud.rows.length > 0){
                return res.status(200).json(secretaria_salud.rows)
            }else{
                return res.send('Miembro de la secretaria de salud no encontrado')
            }
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async postMiembroSalud(req: Request, res: Response): Promise<Response> {
        try {
            const { id, nombre, apellido, contrasenia } = req.body;
            await pool.query('INSERT INTO miembro_secretaria_salud {id, nombre, apellido, contrasenia} VALUES {$1, $2, $3, $4}'),
                [id, nombre, apellido, contrasenia];
            console.log(req.body);
            return res.status(200).send('INSERTADO');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }        
    }

    public async putMiembroSalud(req: Request, res: Response): Promise<Response> {
        try {
            const { id, nombre, apellido, contrasenia } = req.body;
            await pool.query('UPDATE miembro_secretaria_salud SET nombre = $1, apellido = $2 contrasenia $3 WHERE id = $4'),
                [nombre, apellido, contrasenia, id];
            console.log(req.body);
            return res.status(200).send('ACTUALIZADO');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }        
    }

    public async deleteMiembroSalud(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.body;
            await pool.query('DELETE FROM miembro_secretaria_salud WHERE id = $1', [id])
            console.log(req.body);
            return res.status(200).send('BORRADO');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const miembroSecretariaSaludController = new MiembroSecretariaSaludController();
export default miembroSecretariaSaludController;