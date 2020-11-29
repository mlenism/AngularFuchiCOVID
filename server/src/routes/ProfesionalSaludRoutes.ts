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
        this.router.get('/:id', profesionalSaludController.getOne);
        this.router.post('/', profesionalSaludController.postProfesional);
        this.router.put('/', profesionalSaludController.putProfesional);
        this.router.post('/delete', profesionalSaludController.deleteProfesional);
    }
}

const profesionalSaludRoutes = new ProfesionalSaludRoutes();
export default profesionalSaludRoutes.router;