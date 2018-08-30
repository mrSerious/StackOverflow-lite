import pg from 'pg';
import Dotenv from 'dotenv';
import config from '../config/config';
const parseDbUrl = require('parse-database-url');

Dotenv.config();

let settings = '';
const dbConfig = parseDbUrl(process.env.DATABASE_URL);
if (process.env.NODE_ENV) {
  if (process.env.NODE_ENV === 'test') {
    settings = config.test;
  } else if (process.NODE_ENV === 'production') {
    settings = dbConfig;
  }
}

const pool = new pg.Pool(settings || config.development);

export default pool;
