"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EntidadDeSaludController_1 = __importDefault(require("../controllers/EntidadDeSaludController"));
class EntidadDeSaludRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', EntidadDeSaludController_1.default.getEntidadesDeSalud);
    }
}
const entidadDeSaludRoutes = new EntidadDeSaludRoutes();
exports.default = entidadDeSaludRoutes.router;
