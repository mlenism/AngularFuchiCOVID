import { Router } from 'express';
import barriosController from '../controllers/BarriosController';

class BarriosRoutes {
    
    public router: Router;
    
    constructor() {
        this.router = Router();
        this.config();
    }
    
    config() {
        this.router.get('/', barriosController.getBarrios);
    }
}

const barriosRoutes = new BarriosRoutes();
export default barriosRoutes.router;