import { Router } from 'express';
import estadisticasController from '../controllers/EstadisticasController';

class EstadiasticasRouter {
    
    public router: Router;
    
    constructor() {
        this.router = Router();
        this.config();
    }
    
    config() {
        this.router.get('/', estadisticasController.getEstadisticas);
        this.router.get('/Infectados-x-barrio', estadisticasController.getInfectadosPorBarrio);
        this.router.get('/Infectados-x-edad', estadisticasController.getInfectadosPorEdad);
    }
}

const estadiasticasRouter = new EstadiasticasRouter();
export default estadiasticasRouter.router;