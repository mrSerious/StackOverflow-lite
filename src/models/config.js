// const config = {
//   user: process.env.DB_USER,
//   database: process.env.DB_URL,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
//   max: 10,
//   idleTimeoutMillis: 3000,
// };

export default {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_URL,
    host: '127.0.0.1',
    port: 5432,
    secret_key: process.env.SECRET_KEY,
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'so-lite-test',
    host: '127.0.0.1',
    port: 5432,
    secret_key: process.env.SECRET_KEY,
    dialect: 'postgres'
  },
  production: {
    environment: 'production'
  }
}
