"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LaboratorioMedicamentoController_1 = __importDefault(require("../controllers/LaboratorioMedicamentoController"));
class FamiliarRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', LaboratorioMedicamentoController_1.default.getLabMedicametos);
        this.router.post('/', LaboratorioMedicamentoController_1.default.getStock);
    }
}
const familiarRoutes = new FamiliarRoutes();
exports.default = familiarRoutes.router;
