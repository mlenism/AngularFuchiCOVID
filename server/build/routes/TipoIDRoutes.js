"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TipoIDController_1 = __importDefault(require("../controllers/TipoIDController"));
class TipoIDRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TipoIDController_1.default.getTipoIDs);
    }
}
const tipoIDRoutes = new TipoIDRoutes();
exports.default = tipoIDRoutes.router;
