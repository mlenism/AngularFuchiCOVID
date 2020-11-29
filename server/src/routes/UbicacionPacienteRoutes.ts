import { Router } from 'express';
import ubicacionPacienteController from '../controllers/UbicacionPacienteController';

class UbicacionPacienteRoutes {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config() {
        this.router.get('/', ubicacionPacienteController.getUbicacion);
        this.router.get('/:id', ubicacionPacienteController.getOne);
        this.router.post('/', ubicacionPacienteController.postUbicacion);
        this.router.put('/', ubicacionPacienteController.putUbicacion);
    }
}

const ubicacionPacienteRoutes = new UbicacionPacienteRoutes();
export default ubicacionPacienteRoutes.router;
