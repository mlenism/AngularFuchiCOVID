"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    host: 'ec2-34-232-212-164.compute-1.amazonaws.com',
    user: 'ytyiqjsjpgklts',
    password: '0929b20966541232fe08915ce8110074ebfdad2ff446b911647acf2ba0355d45',
    database: 'd377oo2m04b6rp',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});
