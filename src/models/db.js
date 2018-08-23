import pg from 'pg';
import Dotenv from 'dotenv';

Dotenv.config();

const config = {
  user: process.env.DB_USER,
  database: process.env.DB_URL,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  max: 10,
  idleTimeoutMillis: 3000,
};

const pool = new pg.Pool(config);

export default pool;
