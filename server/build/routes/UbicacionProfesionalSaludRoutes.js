"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UbicacionProfesionalSaludController_1 = __importDefault(require("../controllers/UbicacionProfesionalSaludController"));
class UbicacionProfesionalSaludRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', UbicacionProfesionalSaludController_1.default.getUbicaciones);
    }
}
const ubicacionProfesionalSaludRoutes = new UbicacionProfesionalSaludRoutes();
exports.default = ubicacionProfesionalSaludRoutes.router;
