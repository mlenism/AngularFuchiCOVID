import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

class PacienteController {

    public async getPacientes(req: Request, res: Response): Promise<Response> {
        try {
            const pacientes: QueryResult = await pool.query('SELECT * FROM paciente ORDER BY (id) ASC');
            return res.status(200).json(pacientes.rows);            
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async getOne(req: Request, res: Response): Promise<Response> {
        try{
            const { id } = req.params;
            const paciente: QueryResult = await pool.query('SELECT * FROM paciente WHERE id = $1', [id])
            if(paciente.rows.length > 0){
                return res.status(200).json(paciente.rows)
            }else{
                return res.send('Paciente no encontrado')
            }
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async postPacientes(req: Request, res: Response): Promise<Response> {
        try {
            const { id, nombre, apellido, id_tipodID, numeroDeIntegrantes, ciudad_contagio, id_medico } = req.body;
            await pool.query('INSERT INTO paciente {id, nombre, apellido, id_tipoId, numeroDeIntegrantes, ciudad_contagio, id_medico} VALUES{$1, $2, $3, $4, $5, $6, $7}'),
                [id, nombre, apellido, id_tipodID, numeroDeIntegrantes, ciudad_contagio, id_medico]
            console.log(req.body);
            return res.status(200).send('INSERTADO');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async putPacientes(req: Request, res: Response): Promise<Response> {
        try {
            const { id, nombre, apellido, id_tipodID, numeroDeIntegrantes, ciudad_contagio, id_medico } = req.body;
            await pool.query('UPDATE paciente nombre = $1, apellido = $2, id_tipoId = $3, numeroDeIntegrantes = $4, ciudad_contagio = $5, id_medico = $6 WHERE id = $7'),
                [ nombre, apellido, id_tipodID, numeroDeIntegrantes, ciudad_contagio, id_medico, id]
            console.log(req.body);
            return res.status(200).send('ACTUALIZADO');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async deletePaciente(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.body;
            await pool.query('DELETE FROM paciente WHERE id = $1', [id])
            console.log(req.body);
            return res.status(200).send('BORRADO');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const pacienteController = new PacienteController();
export default pacienteController;