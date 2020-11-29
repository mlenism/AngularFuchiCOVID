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
        this.router.get('/:id', EntidadDeSaludController_1.default.getOne);
        this.router.put('/', EntidadDeSaludController_1.default.putEntidad);
        this.router.post('/', EntidadDeSaludController_1.default.postEntidad);
        this.router.post('/delete', EntidadDeSaludController_1.default.postEntidad);
    }
}
const entidadDeSaludRoutes = new EntidadDeSaludRoutes();
exports.default = entidadDeSaludRoutes.router;
