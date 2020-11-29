"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VisitaController_1 = __importDefault(require("../controllers/VisitaController"));
class VisitaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/visita-medico', VisitaController_1.default.getVisitas);
        this.router.get('/pacientes', VisitaController_1.default.getVisitaPacientes);
        this.router.post('/', VisitaController_1.default.setVisita);
        this.router.put('/', VisitaController_1.default.updateVisita);
        this.router.post('/delete', VisitaController_1.default.deleteVisita);
    }
}
const visitaRoutes = new VisitaRoutes();
exports.default = visitaRoutes.router;
