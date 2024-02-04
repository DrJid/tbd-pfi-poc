import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';
dotenv.config();
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});
const client = await pool.connect();
export default client;
//# sourceMappingURL=db.js.map