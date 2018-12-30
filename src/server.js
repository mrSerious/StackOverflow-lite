/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import Dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import apiVersion1 from './routes/routes-api1';

Dotenv.config();

const swaggerDocument = require('../swagger.json');

const app = express();
const port = process.env.PORT || 3000;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(expressValidator());
app.use('/api/v1', apiVersion1);
// app.use('/', express.static('Frontend'));
app.use(express.static('./dist/client'));
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/client/index.html'));
});

app.use((request, response, next) => {
  response.status(404).json({
    status: 'Failure',
    message: 'Sorry can\'t find that page!'
  });
});

app.listen(port);

export default app;
