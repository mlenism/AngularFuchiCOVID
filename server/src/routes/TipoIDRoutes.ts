import { Router } from 'express';
import tipoIDController from '../controllers/TipoIDController';

class TipoIDRoutes {
    
    public router: Router;
    
    constructor() {
        this.router = Router();
        this.config();
    }
    
    config() {
        this.router.get('/', tipoIDController.getTipoIDs);
        this.router.get('/:id', tipoIDController.getOne);
        this.router.post('/', tipoIDController.postTipoID);
        this.router.put('/', tipoIDController.putTipoID);
        this.router.post('/delete', tipoIDController.deleteTipoID);
    }
}

const tipoIDRoutes = new TipoIDRoutes();
export default tipoIDRoutes.router;