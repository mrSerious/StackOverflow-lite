import pg from 'pg';
import Dotenv from 'dotenv';
import config from '../config/config';

Dotenv.config();

// const env = process.env.NODE_ENV || 'development';
// const configObj = config[env];
let settings = '';
if (process.NODE_ENV) {
  if (process.NODE_ENV.trim() === 'test') {
    settings = config.test;
  }
  if (process.NODE_ENV.trim() === 'production') {
    settings = config.production;
  }
}

const pool = new pg.Pool(settings || config.development);

export default pool;
