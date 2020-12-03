"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FamiliarController_1 = __importDefault(require("../controllers/FamiliarController"));
class FamiliarRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/get', FamiliarController_1.default.getFamiliares);
        this.router.post('/', FamiliarController_1.default.setFamiliar);
        this.router.put('/', FamiliarController_1.default.updateFamiliar);
        this.router.post('/delete', FamiliarController_1.default.deleteFamiliar);
    }
}
const familiarRoutes = new FamiliarRoutes();
exports.default = familiarRoutes.router;
