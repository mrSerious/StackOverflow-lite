import Dotenv from 'dotenv';

Dotenv.config();

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'so-lite-dev',
    host: process.env.DB_HOST,
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'so-lite-test',
    host: process.env.DB_HOST,
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    environment: 'production'
  }
};

export default config;