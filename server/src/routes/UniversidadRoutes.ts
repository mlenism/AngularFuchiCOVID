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
    }
}

const universidadRoutes = new UniversidadRoutes();
export default universidadRoutes.router;