import pg from 'pg';
const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || 'postgres://pgvxcrfurnqshy:8ff22d29beb06f906c66c5f1779bec233e3f2cfe3a3efd49bccb31a1b691f920@ec2-3-232-218-211.compute-1.amazonaws.com:5432/d6hlvjr0qtntv9'

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const client = await pool.connect();

export default client
