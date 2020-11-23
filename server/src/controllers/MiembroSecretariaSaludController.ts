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
}

const miembroSecretariaSaludController = new MiembroSecretariaSaludController();
export default miembroSecretariaSaludController;