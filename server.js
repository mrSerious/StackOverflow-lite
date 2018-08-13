/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';

import apiVersion1 from './routes/routes-api1';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());
app.use('/api/v1', apiVersion1);
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.listen(port);

export default app;
