import pg from 'pg';
import Dotenv from 'dotenv';
import config from '../config/config';

Dotenv.config();

let settings = '';

if (process.env.NODE_ENV) {
  if (process.env.NODE_ENV === 'test') {
    settings = config.test;
  } else if (process.NODE_ENV === 'production') {
    settings = process.env.HEROKU_POSTGRESQL_GREEN_URL;
  }
}

// const pool = new pg.Pool(settings || config.development);
const pool = new pg.Pool(process.env.HEROKU_POSTGRESQL_GREEN_URL);

export default pool;
