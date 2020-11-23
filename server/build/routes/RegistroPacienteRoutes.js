"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RegistroPacienteController_1 = __importDefault(require("../controllers/RegistroPacienteController"));
class RegistroPacienteRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', RegistroPacienteController_1.default.getRegistros);
    }
}
const registroPacienteRoutes = new RegistroPacienteRoutes();
exports.default = registroPacienteRoutes.router;
