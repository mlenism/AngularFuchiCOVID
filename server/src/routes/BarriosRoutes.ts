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
        this.router.get('/:id', barriosController.getOne)
        this.router.put('/', barriosController.putBarrio);
        this.router.post('/', barriosController.postBarrio);
        this.router.post('/delete', barriosController.deleteBarrio);
    }
}

const barriosRoutes = new BarriosRoutes();
export default barriosRoutes.router;