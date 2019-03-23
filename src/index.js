import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';

import { get } from './queries';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (_, res) => {
  res.json({ info: 'Postgres API' });
});

app.get('/test', get);

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
});
