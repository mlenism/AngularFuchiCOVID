"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    host: 'ec2-3-226-231-4.compute-1.amazonaws.com',
    user: 'yxxhpsomjxonbm',
    password: '3f001f2f6e18fab2eec0f5e7a7dccaffd42b2cb754596ff21723dc6ca90e8745',
    database: 'd77buj6mk5q8gq',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});