import { Router } from 'express';
import entidadDeSaludController from '../controllers/EntidadDeSaludController';

class EntidadDeSaludRoutes {
    
    public router: Router;
    
    constructor() {
        this.router = Router();
        this.config();
    }
    
    config() {
        this.router.get('/', entidadDeSaludController.getEntidadesDeSalud);
    }
}

const entidadDeSaludRoutes = new EntidadDeSaludRoutes();
export default entidadDeSaludRoutes.router;