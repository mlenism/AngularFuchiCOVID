import { Router } from 'express';
import tipoIDController from '../controllers/TipoIDController';

class TipoIDRoutes {
    
    public router: Router;
    
    constructor() {
        this.router = Router();
        this.config();
    }
    
    config() {
        this.router.get('/', tipoIDController.getTipoIDs);
    }
}

const tipoIDRoutes = new TipoIDRoutes();
export default tipoIDRoutes.router;