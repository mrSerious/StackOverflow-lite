import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';

import apiVersion1 from './routes/routes-api1';

const app = express();
const port = process.env.PORT || 3000;

app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/api/v1', apiVersion1);

app.listen(port);

export default app;
