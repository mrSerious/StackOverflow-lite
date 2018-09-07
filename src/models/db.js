import pg from 'pg';
import Dotenv from 'dotenv';
import parseDbUrl from 'parse-database-url';
import config from '../config/config';

Dotenv.config();

const dbConfig = parseDbUrl(process.env.DATABASE_URL);

let settings = '';

if (process.env.NODE_ENV) {
  if (process.env.NODE_ENV === 'test') {
    settings = config.test;
  } else if (process.NODE_ENV === 'production') {
    settings = dbConfig;
  }
}

// console.log(dbConfig);

const pool = new pg.Pool(settings || config.development);
// const pool = new pg.Pool(dbConfig);

export default pool;
