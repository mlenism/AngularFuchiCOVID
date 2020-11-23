"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PacienteController_1 = __importDefault(require("../controllers/PacienteController"));
class MiembroSecretariaSaludRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', PacienteController_1.default.getPacientes);
        this.router.post('/', PacienteController_1.default.setPacientes);
        this.router.put('/', PacienteController_1.default.updatePacientes);
        this.router.delete('/:id', PacienteController_1.default.deletePaciente);
    }
}
const miembroSecretariaSaludRoutes = new MiembroSecretariaSaludRoutes();
exports.default = miembroSecretariaSaludRoutes.router;
