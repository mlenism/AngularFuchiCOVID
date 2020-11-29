import express, { Application } from 'express';
import cors from 'cors';

import barriosRoutes from './routes/BarriosRoutes';
import tipoIDRoutes from './routes/TipoIDRoutes';
import laboratorioRoutes from './routes/LaboratorioRoutes';
import medicamentoRoutes from './routes/MedicamentoRoutes';
import universidadRoutes from './routes/UniversidadRoutes';
import entidadDeSaludRoutes from './routes/EntidadDeSaludRoutes';
import miembroSecretariaSaludRoutes from './routes/MiembroSecretariaSaludRoutes';
import familiarRoutes from './routes/FamiliarRoutes';
import laboratorioMedicamentoRoutes from './routes/LaboratorioMedicamentoRoutes';
import profesionalSaludRoutes from './routes/ProfesionalSaludRoutes';
import pacienteRoutes from './routes/PacienteRoutes';
import visitaRoutes from './routes/VisitaRoutes';
import estadiasticasRouter from './routes/EstadiasticasRouter';
import ubicacionPacienteRoutes from './routes/UbicacionPacienteRoutes';

class Server {
    
    public app: Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    
    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }
    
    routes(): void {
        this.app.use('/barrios', barriosRoutes);
        this.app.use('/tipoIDs', tipoIDRoutes);
        this.app.use('/laboratorios', laboratorioRoutes);
        this.app.use('/medicamentos', medicamentoRoutes);
        this.app.use('/universidades', universidadRoutes);
        this.app.use('/entidadDeSalud', entidadDeSaludRoutes);
        this.app.use('/secSalud', miembroSecretariaSaludRoutes);
        this.app.use('/familiar', familiarRoutes);
        this.app.use('/laboratorio-medicamentos', laboratorioMedicamentoRoutes);
        this.app.use('/profesionalSalud', profesionalSaludRoutes);
        this.app.use('/pacientes', pacienteRoutes);
        this.app.use('/visita', visitaRoutes);
        this.app.use('/estadisticas', estadiasticasRouter);
        this.app.use('/ubicacion-pacientes', ubicacionPacienteRoutes);
    }
    
    start(): void {
        this.app.listen(3000, () => {
            console.log("server on port", this.app.get('port'));
        })
    }
}

const server = new Server();
server.start();