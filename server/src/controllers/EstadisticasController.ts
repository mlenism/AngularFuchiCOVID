import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

class EstadisticasController {

    public async getEstadisticas(req: Request, res: Response): Promise<Response> {
        try {
            const listaPruebra = [
              {
                id: "promedio de contagiados",
                nombre: '40'
              },
              {
                id: "promedio de visitas diarias",
                nombre: '50'
              },
              {
                id: "promedio de visitas semanales",
                nombre: '60.5'
              },
              {
                id: "promedio de visitas mensuales",
                nombre: '24'
              }
            ];
            return res.status(200).json(listaPruebra);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const estadisticasController = new EstadisticasController();
export default estadisticasController;