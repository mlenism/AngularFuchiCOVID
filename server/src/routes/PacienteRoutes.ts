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
        this.router.post('/', pacienteController.setPacientes);
        this.router.put('/', pacienteController.updatePacientes);
        this.router.delete('/:id', pacienteController.deletePaciente);
    }
}

const miembroSecretariaSaludRoutes = new MiembroSecretariaSaludRoutes();
export default miembroSecretariaSaludRoutes.router;