import { Router } from 'express';
import laboratorioMedicamentoController from '../controllers/LaboratorioMedicamentoController';

class FamiliarRoutes {
    
    public router: Router;
    
    constructor() {
        this.router = Router();
        this.config();
    }
    
    config() {
        this.router.get('/', laboratorioMedicamentoController.getLabMedicametos);
        this.router.post('/', laboratorioMedicamentoController.getStock);
    }
}

const familiarRoutes = new FamiliarRoutes();
export default familiarRoutes.router;