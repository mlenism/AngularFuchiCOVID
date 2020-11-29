import { Router } from 'express';
import entidadDeSaludController from '../controllers/EntidadDeSaludController';

class EntidadDeSaludRoutes {
    
    public router: Router;
    
    constructor() {
        this.router = Router();
        this.config();
    }
    
    config() {
        this.router.get('/', entidadDeSaludController.getEntidadesDeSalud);
        this.router.get('/:id', entidadDeSaludController.getOne);
        this.router.put('/', entidadDeSaludController.putEntidad);
        this.router.post('/', entidadDeSaludController.postEntidad);
        this.router.post('/delete', entidadDeSaludController.postEntidad)
    }
}

const entidadDeSaludRoutes = new EntidadDeSaludRoutes();
export default entidadDeSaludRoutes.router;