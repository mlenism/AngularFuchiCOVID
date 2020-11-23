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
    }
}

const estadiasticasRouter = new EstadiasticasRouter();
export default estadiasticasRouter.router;