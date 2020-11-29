"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MiembroSecretariaSaludController_1 = __importDefault(require("../controllers/MiembroSecretariaSaludController"));
class MiembroSecretariaSaludRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', MiembroSecretariaSaludController_1.default.getMiembros);
        this.router.post('/user', MiembroSecretariaSaludController_1.default.singIn);
    }
}
const miembroSecretariaSaludRoutes = new MiembroSecretariaSaludRoutes();
exports.default = miembroSecretariaSaludRoutes.router;
