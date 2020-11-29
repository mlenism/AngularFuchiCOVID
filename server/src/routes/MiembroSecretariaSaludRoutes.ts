import { Router } from 'express';
import medicamentoController from '../controllers/MedicamentoController';
import miembroSecretariaSaludController from '../controllers/MiembroSecretariaSaludController';

class MiembroSecretariaSaludRoutes {
    
    public router: Router;
    
    constructor() {
        this.router = Router();
        this.config();
    }
    
    config() {
        this.router.get('/', miembroSecretariaSaludController.getMiembros);
        this.router.get('/:id', miembroSecretariaSaludController.getOne);
        this.router.post('/user', miembroSecretariaSaludController.singIn);
        this.router.post('/', miembroSecretariaSaludController.postMiembroSalud);
        this.router.put('/', miembroSecretariaSaludController.putMiembroSalud);
        this.router.post('/delete', miembroSecretariaSaludController.deleteMiembroSalud);
    }
}

const miembroSecretariaSaludRoutes = new MiembroSecretariaSaludRoutes();
export default miembroSecretariaSaludRoutes.router;