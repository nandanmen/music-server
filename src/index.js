import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';

import { get } from './queries';
import {
  registerHandler,
  loginHandler,
  protectRoutesHandler
} from './utils/auth';

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (_, res) => {
  res.json({ info: 'Postgres API' });
});

app.get('/test', get);

app.post('/register', registerHandler);
app.post('/login', loginHandler);

app.use('/api', protectRoutesHandler);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
