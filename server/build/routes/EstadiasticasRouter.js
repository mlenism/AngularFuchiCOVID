"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EstadisticasController_1 = __importDefault(require("../controllers/EstadisticasController"));
class EstadiasticasRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', EstadisticasController_1.default.getEstadisticas);
        this.router.get('/Infectados-x-barrio', EstadisticasController_1.default.getInfectadosPorBarrio);
        this.router.get('/Infectados-x-edad', EstadisticasController_1.default.getInfectadosPorEdad);
    }
}
const estadiasticasRouter = new EstadiasticasRouter();
exports.default = estadiasticasRouter.router;
