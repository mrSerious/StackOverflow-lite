/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import Dotenv from 'dotenv';
import apiVersion1 from './routes/routes-api1';

Dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use('/api/v1', apiVersion1);
app.use((request, response, next) => {
  response.status(404).json({
    status: 'Failure',
    message: 'Sorry can\'t find that page!'
  });
});

app.listen(port);

export default app;
