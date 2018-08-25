import pg from 'pg';
import Dotenv from 'dotenv';
// import config from './config';

Dotenv.config();

const config = {
  user: process.env.DB_USER,
  database: 'so-lite-test',
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  max: 10,
  idleTimeoutMillis: 3000,
};

const pool = new pg.Pool(config);

export default pool;
