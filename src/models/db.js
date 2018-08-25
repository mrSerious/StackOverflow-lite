import pg from 'pg';
import Dotenv from 'dotenv';
import config from './config';

Dotenv.config();

const env = process.env.NODE_ENV || 'development';
const configObj = config[env];

const pool = new pg.Pool(configObj);

export default pool;
