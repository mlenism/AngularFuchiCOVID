import { Router } from 'express';
import familiarController from '../controllers/FamiliarController';

class FamiliarRoutes {
    
    public router: Router;
    
    constructor() {
        this.router = Router();
        this.config();
    }
    
    config() {
        this.router.post('/get', familiarController.getFamiliares);
        this.router.post('/', familiarController.setFamiliar);
        this.router.put('/', familiarController.updateFamiliar);
        this.router.post('/delete', familiarController.deleteFamiliar);
    }
}

const familiarRoutes = new FamiliarRoutes();
export default familiarRoutes.router;