"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UbicacionPacienteController_1 = __importDefault(require("../controllers/UbicacionPacienteController"));
class UbicacionPacienteRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', UbicacionPacienteController_1.default.getUbicacion);
    }
}
const ubicacionPacienteRoutes = new UbicacionPacienteRoutes();
exports.default = ubicacionPacienteRoutes.router;
