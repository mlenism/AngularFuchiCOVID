import { Router } from 'express';
import profesionalSaludController from '../controllers/ProfesionalSaludController';

class ProfesionalSaludRoutes {
    
    public router: Router;
    
    constructor() {
        this.router = Router();
        this.config();
    }
    
    config() {
        this.router.get('/', profesionalSaludController.getProfesionales);
        this.router.get('/full', profesionalSaludController.getProfesionalesFullName)
        this.router.post('/', profesionalSaludController.setProfesional);
        this.router.put('/', profesionalSaludController.updateProfesional);
        this.router.delete('/:id', profesionalSaludController.deleteProfesional);
    }
}

const profesionalSaludRoutes = new ProfesionalSaludRoutes();
export default profesionalSaludRoutes.router;