import { Router } from 'express';
import visitaController from '../controllers/VisitaController';

class VisitaRoutes {
    
    public router: Router;
    
    constructor() {
        this.router = Router();
        this.config();
    }
    
    config() {
        this.router.post('/visita-medico', visitaController.getVisitas);
        this.router.get('/pacientes', visitaController.getVisitaPacientes);
        this.router.post('/', visitaController.setVisita);
        this.router.put('/', visitaController.updateVisita);
        this.router.post('/delete', visitaController.deleteVisita);
    }
}

const visitaRoutes = new VisitaRoutes();
export default visitaRoutes.router;