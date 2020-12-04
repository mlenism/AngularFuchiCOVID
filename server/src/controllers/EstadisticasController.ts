import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

class EstadisticasController {

    public async getInfectadosPorBarrio(req: Request, res: Response): Promise<Response> {
        try {
            const infectados: QueryResult = await pool.query('SELECT ba.nombre AS id,'
            +'COUNT(*) AS nombre FROM ubicacion_paciente ub JOIN barrio ba '
            +'ON (ub.id_barrio = ba.id) '
            +'GROUP BY (ba.nombre) '
            +'ORDER BY nombre');
            return res.status(200).json(infectados.rows);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async getInfectadosPorEdad(req: Request, res: Response): Promise<Response> {
      try {
          const infectados: QueryResult = await pool.query('SELECT edad AS id,'
          +' COUNT(edad) AS nombre FROM paciente GROUP BY edad');
          return res.status(200).json(infectados.rows);
      } catch (e) {
          console.log(e);
          return res.status(500).json('Internal server error');
      }
  }

    public async getEstadisticas(req: Request, res: Response): Promise<Response> {
        try {
            const totalContagiados: QueryResult = await pool.query(`SELECT ('Total contagiados') AS id, `
            +`COUNT(*) AS nombre FROM paciente`);
            
            const promedioDia: QueryResult = await pool.query(`SELECT ('Promedio de visitas diarias') AS id, `
            +`round(AVG(COUNT),2) nombre `
            +`FROM (SELECT fecha_registro, COUNT(fecha_registro) FROM visita GROUP BY (fecha_registro)) av`);

            const promedioSemana: QueryResult = await pool.query(`SELECT ('promedio de visitas semanales') as id, `
            +`round(AVG(COUNT),2) nombre FROM (SELECT COUNT(date_part) `
            +`FROM (SELECT DATE_PART('week', fecha_registro) `
            +`FROM visita ORDER BY fecha_registro) da GROUP BY date_part) av`);

            const promedioMensual: QueryResult = await pool.query(`SELECT ('promedio de visitas mensuales') as id, `
            +`round(AVG(COUNT),2) nombre FROM (SELECT COUNT(date_part) `
            +`FROM (SELECT DATE_PART('month', fecha_registro) `
            +`FROM visita ORDER BY fecha_registro) da GROUP BY date_part) av `);
  
            const listaEstadisticas = [
                totalContagiados.rows[0],
                promedioDia.rows[0],
                promedioSemana.rows[0],
                promedioMensual.rows[0]
            ];
            return res.status(200).json(listaEstadisticas);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const estadisticasController = new EstadisticasController();
export default estadisticasController;