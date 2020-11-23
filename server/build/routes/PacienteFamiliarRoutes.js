"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PacienteFamiliarController_1 = __importDefault(require("../controllers/PacienteFamiliarController"));
class PacienteFamiliarRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', PacienteFamiliarController_1.default.getFamiliares);
    }
}
const pacienteFamiliarRoutes = new PacienteFamiliarRoutes();
exports.default = pacienteFamiliarRoutes.router;
