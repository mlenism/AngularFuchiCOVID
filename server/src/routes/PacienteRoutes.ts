import { Router } from 'express';
import pacienteController from '../controllers/PacienteController';

class MiembroSecretariaSaludRoutes {
    
    public router: Router;
    
    constructor() {
        this.router = Router();
        this.config();
    }
    
    config() {
        this.router.get('/', pacienteController.getPacientes);
        this.router.get('/:id', pacienteController.getOne);
        this.router.post('/', pacienteController.postPacientes);
        this.router.put('/', pacienteController.putPacientes);
        this.router.post('/delete', pacienteController.deletePaciente);
    }
}

const miembroSecretariaSaludRoutes = new MiembroSecretariaSaludRoutes();
export default miembroSecretariaSaludRoutes.router;