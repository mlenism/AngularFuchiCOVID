"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    host: ' ',
    user: ' ',
    password: ' ',
    database: ' ',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});
