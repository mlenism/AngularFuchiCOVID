"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VisitaDosisDiariaController_1 = __importDefault(require("../controllers/VisitaDosisDiariaController"));
class VisitaDosisDiariaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', VisitaDosisDiariaController_1.default.getDosisDiarias);
    }
}
const visitaDosisDiariaRoutes = new VisitaDosisDiariaRoutes();
exports.default = visitaDosisDiariaRoutes.router;
