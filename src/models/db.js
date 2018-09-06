import pg from 'pg';
import Dotenv from 'dotenv';
import config from '../config/config';
const parseDbUrl = require('parse-database-url');

Dotenv.config();

let settings = '';

if (process.env.NODE_ENV) {
  if (process.env.NODE_ENV === 'test') {
    settings = config.test;
  } else if (process.NODE_ENV === 'production') {
    settings = process.env.HEROKU_POSTGRESQL_GREEN_URL;
  }
}

const pool = new pg.Pool({ string: process.env.DATABASE_URL });

export default pool;
