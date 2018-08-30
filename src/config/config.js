import Dotenv from 'dotenv';

Dotenv.config();

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'so-lite-dev',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USER_TEST,
    password: process.env.DB_PASS_TEST,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST_TEST,
    port: process.env.DB_PORT_TEST,
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USER_PROD,
    password: process.env.DB_PASS_PROD,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST_PROD,
    port: process.env.DB_PORT_PROD,
    dialect: 'postgres'
  }
};

export default config;
