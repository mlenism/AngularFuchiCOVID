import { Router } from 'express';
import familiarController from '../controllers/FamiliarController';

class FamiliarRoutes {
    
    public router: Router;
    
    constructor() {
        this.router = Router();
        this.config();
    }
    
    config() {
        this.router.get('/', familiarController.getFamiliares);
        this.router.get('/:id', familiarController.getOne);
        this.router.post('/', familiarController.postFamiliar);
        this.router.put('/', familiarController.putFamiliar);
        this.router.post('/delete', familiarController.deleteFamiliar);
    }
}

const familiarRoutes = new FamiliarRoutes();
export default familiarRoutes.router;