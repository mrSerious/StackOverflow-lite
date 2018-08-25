require('dotenv').config();

export default {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'so-lite-dev',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'so-lite-test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    environment: 'production'
  }
};
