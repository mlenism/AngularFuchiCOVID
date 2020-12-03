
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
    }
}

const ubicacionPacienteRoutes = new UbicacionPacienteRoutes();
export default ubicacionPacienteRoutes.router;