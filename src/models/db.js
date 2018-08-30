import pg from 'pg';
import Dotenv from 'dotenv';
import config from '../config/config';
const parseDbUrl = require('parse-database-url');

Dotenv.config();

let settings = '';


if (process.env.NODE_ENV === 'test') {
  settings = config.test;
} else if (process.env.NODE_ENV === 'development') {
  settings = config.development;
} else if (process.env.NODE_ENV === 'production') {
  settings = process.env.DATABASE_URL;
  console.log(settings);
}

const pool = new pg.Pool({ settings });

export default pool;
