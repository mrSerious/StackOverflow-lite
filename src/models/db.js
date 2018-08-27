import pg from 'pg';
import Dotenv from 'dotenv';
import config from '../config/config';

Dotenv.config();

const env = process.env.NODE_ENV || 'development';
const configObj = config[env];

console.log(env);
console.log(configObj);
const pool = new pg.Pool(config.development);

export default pool;
