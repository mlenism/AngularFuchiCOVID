import { Router } from 'express';
import visitaController from '../controllers/VisitaController';

class VisitaRoutes {
    
    public router: Router;
    
    constructor() {
        this.router = Router();
        this.config();
    }
    
    config() {
        this.router.get('/', visitaController.getVisitas);
        this.router.get('/:id', visitaController.getOne);
        this.router.post('/', visitaController.postVisita);
        this.router.put('/', visitaController.putVisita);
        this.router.post('/delete', visitaController.deleteVisita);
    }
}

const visitaRoutes = new VisitaRoutes();
export default visitaRoutes.router;