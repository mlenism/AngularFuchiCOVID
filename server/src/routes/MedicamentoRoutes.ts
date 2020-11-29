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
        this.router.get('/:id', medicamentoController.getOne);
        this.router.post('/', medicamentoController.postMedicamento);
        this.router.put('/', medicamentoController.putMedicamento);
        this.router.post('/delete', medicamentoController.deleteMedicamento);
    }
}

const medicamentoRoutes = new MedicamentoRoutes();
export default medicamentoRoutes.router;