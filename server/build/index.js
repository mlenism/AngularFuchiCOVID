"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const BarriosRoutes_1 = __importDefault(require("./routes/BarriosRoutes"));
const TipoIDRoutes_1 = __importDefault(require("./routes/TipoIDRoutes"));
const LaboratorioRoutes_1 = __importDefault(require("./routes/LaboratorioRoutes"));
const MedicamentoRoutes_1 = __importDefault(require("./routes/MedicamentoRoutes"));
const UniversidadRoutes_1 = __importDefault(require("./routes/UniversidadRoutes"));
const EntidadDeSaludRoutes_1 = __importDefault(require("./routes/EntidadDeSaludRoutes"));
const MiembroSecretariaSaludRoutes_1 = __importDefault(require("./routes/MiembroSecretariaSaludRoutes"));
const FamiliarRoutes_1 = __importDefault(require("./routes/FamiliarRoutes"));
const LaboratorioMedicamentoRoutes_1 = __importDefault(require("./routes/LaboratorioMedicamentoRoutes"));
const ProfesionalSaludRoutes_1 = __importDefault(require("./routes/ProfesionalSaludRoutes"));
const UbicacionProfesionalSaludRoutes_1 = __importDefault(require("./routes/UbicacionProfesionalSaludRoutes"));
const PacienteRoutes_1 = __importDefault(require("./routes/PacienteRoutes"));
const UbicacionPacienteRoutes_1 = __importDefault(require("./routes/UbicacionPacienteRoutes"));
const PacienteFamiliarRoutes_1 = __importDefault(require("./routes/PacienteFamiliarRoutes"));
const RegistroProfesionalSaludRoutes_1 = __importDefault(require("./routes/RegistroProfesionalSaludRoutes"));
const RegistroPacienteRoutes_1 = __importDefault(require("./routes/RegistroPacienteRoutes"));
const VisitaRoutes_1 = __importDefault(require("./routes/VisitaRoutes"));
const VisitaDosisDiariaRoutes_1 = __importDefault(require("./routes/VisitaDosisDiariaRoutes"));
const EstadiasticasRouter_1 = __importDefault(require("./routes/EstadiasticasRouter"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/barrios', BarriosRoutes_1.default);
        this.app.use('/tipoIDs', TipoIDRoutes_1.default);
        this.app.use('/laboratorios', LaboratorioRoutes_1.default);
        this.app.use('/medicamentos', MedicamentoRoutes_1.default);
        this.app.use('/universidades', UniversidadRoutes_1.default);
        this.app.use('/entidadDeSalud', EntidadDeSaludRoutes_1.default);
        this.app.use('/secSalud', MiembroSecretariaSaludRoutes_1.default);
        this.app.use('/familiar', FamiliarRoutes_1.default);
        this.app.use('/laboratorio-medicamentos', LaboratorioMedicamentoRoutes_1.default);
        this.app.use('/profesionalSalud', ProfesionalSaludRoutes_1.default);
        this.app.use('/ubiProfesionalSalud', UbicacionProfesionalSaludRoutes_1.default);
        this.app.use('/pacientes', PacienteRoutes_1.default);
        this.app.use('/ubipacientes', UbicacionPacienteRoutes_1.default);
        this.app.use('/paciente-familiar', PacienteFamiliarRoutes_1.default);
        this.app.use('/registroProfesionalSalud', RegistroProfesionalSaludRoutes_1.default);
        this.app.use('/registroPaciente', RegistroPacienteRoutes_1.default);
        this.app.use('/visita', VisitaRoutes_1.default);
        this.app.use('/visitaDosis', VisitaDosisDiariaRoutes_1.default);
        this.app.use('/estadisticas', EstadiasticasRouter_1.default);
    }
    start() {
        this.app.listen(3000, () => {
            console.log("server on port", this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
