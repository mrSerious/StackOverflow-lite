import pg from 'pg';
import Dotenv from 'dotenv';
import parseDbUrl from 'parse-database-url';
import config from '../config/config';

Dotenv.config();

const env = process.env.NODE_ENV || 'development';

const dbConfig = parseDbUrl(process.env.DATABASE_URL);

let settings = '';

if (env === 'development') {
  settings = config.development;
}
if (env === 'test') {
  settings = config.test;
}
if (env === 'production') {
  settings = dbConfig;
}

const pool = new pg.Pool(settings);

export default pool;
