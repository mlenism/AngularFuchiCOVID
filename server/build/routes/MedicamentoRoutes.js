"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MedicamentoController_1 = __importDefault(require("../controllers/MedicamentoController"));
class MedicamentoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', MedicamentoController_1.default.getMedicamentos);
    }
}
const medicamentoRoutes = new MedicamentoRoutes();
exports.default = medicamentoRoutes.router;
