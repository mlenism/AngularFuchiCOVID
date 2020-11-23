"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RegistroProfesionalSaludController_1 = __importDefault(require("../controllers/RegistroProfesionalSaludController"));
class RegistroProfesionalSaludRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', RegistroProfesionalSaludController_1.default.getRegistros);
    }
}
const registroProfesionalSaludRoutes = new RegistroProfesionalSaludRoutes();
exports.default = registroProfesionalSaludRoutes.router;
