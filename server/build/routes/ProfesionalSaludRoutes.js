"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProfesionalSaludController_1 = __importDefault(require("../controllers/ProfesionalSaludController"));
class ProfesionalSaludRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', ProfesionalSaludController_1.default.getProfesionales);
        this.router.get('/full', ProfesionalSaludController_1.default.getProfesionalesFullName);
        this.router.get('/:id', ProfesionalSaludController_1.default.getOne);
        this.router.post('/', ProfesionalSaludController_1.default.postProfesional);
        this.router.put('/', ProfesionalSaludController_1.default.putProfesional);
        this.router.post('/delete', ProfesionalSaludController_1.default.deleteProfesional);
    }
}
const profesionalSaludRoutes = new ProfesionalSaludRoutes();
exports.default = profesionalSaludRoutes.router;
