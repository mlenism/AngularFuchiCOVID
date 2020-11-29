import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

class PacienteController {

    public async getPacientes(req: Request, res: Response): Promise<Response> {
        try {
            // const pacientes: QueryResult = await pool.query('SELECT * FROM paciente ORDER BY (id) ASC');
            // return res.status(200).json(pacientes.rows);
            const listaDePrueba = [
                {
                    id: "1344111111",
                    nombre: "nombre_paciente1",
                    apellido: "apellido_paciente1",
                    medico: "nombre_profesional1 apellido_profesional1",
                    idMedico: "1244111111",
                    direccion: "Cra 2b #50-61",
                    barrio: "Terrón Colorado",
                    idBarrio: "1",
                    geolocalizacion: "3°28 02.3 N 76°30 05.8 W",
                    tipoID: "cedula de ciudadanía",
                    idTipoID: "1",
                    integrantes: "1",
                    ciudad: "Cali"
                }
            ];
            return res.status(200).json(listaDePrueba);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async setPacientes(req: Request, res: Response): Promise<Response> {
        try {
            console.log(req.body);
            return res.status(200).send('INSERTADO');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async updatePacientes(req: Request, res: Response): Promise<Response> {
        try {
            console.log(req.body);
            return res.status(200).send('ACTUALIZADO');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async deletePaciente(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            console.log(id);
            return res.status(200).send('BORRADO');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const pacienteController = new PacienteController();
export default pacienteController;