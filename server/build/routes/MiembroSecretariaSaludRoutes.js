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
        this.router.get('/:id', MiembroSecretariaSaludController_1.default.getOne);
        this.router.post('/user', MiembroSecretariaSaludController_1.default.singIn);
        this.router.post('/', MiembroSecretariaSaludController_1.default.postMiembroSalud);
        this.router.put('/', MiembroSecretariaSaludController_1.default.putMiembroSalud);
        this.router.post('/delete', MiembroSecretariaSaludController_1.default.deleteMiembroSalud);
    }
}
const miembroSecretariaSaludRoutes = new MiembroSecretariaSaludRoutes();
exports.default = miembroSecretariaSaludRoutes.router;
