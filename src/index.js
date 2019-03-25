import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';

import {
  registerHandler,
  loginHandler,
  protectRoutesHandler
} from './utils/auth';
import playlistRouter from './routes/playlists/playlists.router';

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* Authorization routes */
app.post('/register', registerHandler);
app.post('/login', loginHandler);

/* API */
app.use('/api', protectRoutesHandler);

app.use('/playlist', playlistRouter);

/* Initialize server */
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
