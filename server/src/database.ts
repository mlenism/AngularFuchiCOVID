import { Pool } from 'pg';

export const pool = new Pool({
    host: '',
    user: '',
    password: '',
    database: '',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});