"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BarriosController_1 = __importDefault(require("../controllers/BarriosController"));
class BarriosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', BarriosController_1.default.getBarrios);
    }
}
const barriosRoutes = new BarriosRoutes();
exports.default = barriosRoutes.router;
