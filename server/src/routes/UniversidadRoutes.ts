import { Router } from 'express';
import universidadController from '../controllers/UniversidadController';

class UniversidadRoutes {
    
    public router: Router;
    
    constructor() {
        this.router = Router();
        this.config();
    }
    
    config() {
        this.router.get('/', universidadController.getUniversidades);
        this.router.get('/:id', universidadController.getOne);
        this.router.post('/', universidadController.postUniversidad);
        this.router.put('/', universidadController.putUniversidad);
        this.router.post('/delete', universidadController.deleteUniversidad);
    }
}

const universidadRoutes = new UniversidadRoutes();
export default universidadRoutes.router;