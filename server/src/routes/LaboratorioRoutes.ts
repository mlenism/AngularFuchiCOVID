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
        this.router.get('/:id', laboratorioController.getOne);
        this.router.post('/', laboratorioController.postLaboratio);
        this.router.put('/', laboratorioController.putLaboratorio);
        this.router.post('/delete', laboratorioController.deleteLaboratorio);
    }
}

const laboratorioRoutes = new LaboratorioRoutes();
export default laboratorioRoutes.router;