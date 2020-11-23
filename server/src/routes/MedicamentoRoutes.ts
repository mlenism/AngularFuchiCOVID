import { Router } from 'express';
import medicamentoController from '../controllers/MedicamentoController';

class MedicamentoRoutes {
    
    public router: Router;
    
    constructor() {
        this.router = Router();
        this.config();
    }
    
    config() {
        this.router.get('/', medicamentoController.getMedicamentos);
    }
}

const medicamentoRoutes = new MedicamentoRoutes();
export default medicamentoRoutes.router;