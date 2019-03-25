import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import {
  registerHandler,
  loginHandler,
  protectRoutesHandler
} from './utils/auth';
import songsRouter from './routes/songs/songs.router';
import userRouter from './routes/user/user.router';

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
app.use('/api/song', songsRouter);
app.use('/api/user', userRouter);

/* Initialize server */
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
