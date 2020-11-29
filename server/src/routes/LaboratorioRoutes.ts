import { Router } from 'express';
import laboratorioController from '../controllers/LaboratorioController';

class LaboratorioRoutes {
    
    public router: Router;
    
    constructor() {
        this.router = Router();
        this.config();
    }
    
    config() {
        this.router.get('/', laboratorioController.getLaboratorios);
    }
}

const laboratorioRoutes = new LaboratorioRoutes();
export default laboratorioRoutes.router;