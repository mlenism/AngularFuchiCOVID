"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LaboratorioController_1 = __importDefault(require("../controllers/LaboratorioController"));
class LaboratorioRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', LaboratorioController_1.default.getLaboratorios);
        this.router.get('/:id', LaboratorioController_1.default.getOne);
        this.router.post('/', LaboratorioController_1.default.postLaboratio);
        this.router.put('/', LaboratorioController_1.default.putLaboratorio);
        this.router.post('/delete', LaboratorioController_1.default.deleteLaboratorio);
    }
}
const laboratorioRoutes = new LaboratorioRoutes();
exports.default = laboratorioRoutes.router;
