import { Router } from 'express';
import miembroSecretariaSaludController from '../controllers/MiembroSecretariaSaludController';

class MiembroSecretariaSaludRoutes {
    
    public router: Router;
    
    constructor() {
        this.router = Router();
        this.config();
    }
    
    config() {
        this.router.get('/', miembroSecretariaSaludController.getMiembros);
        this.router.post('/user', miembroSecretariaSaludController.singIn);
    }
}

const miembroSecretariaSaludRoutes = new MiembroSecretariaSaludRoutes();
export default miembroSecretariaSaludRoutes.router;