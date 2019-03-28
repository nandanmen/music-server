import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import 'dotenv/config';
import {
  registerHandler,
  loginHandler,
  protectRoutesHandler
} from './utils/auth';
import songsRouter from './routes/songs/songs.router';
import userRouter from './routes/user/user.router';
import selfRouter from './routes/self/self.router';
import likesRouter from './routes/likes/likes.router';
import playlistRouter from './routes/playlist/playlist.router';
import artistRouter from './routes/artist/artist.router';

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(logger('dev'));

/* Authorization routes */
app.post('/register', registerHandler);
app.post('/login', loginHandler);

/* API */
app.use('/api', protectRoutesHandler);
app.use('/api/likes', likesRouter);
app.use('/api/playlist', playlistRouter);
app.use('/api/song', songsRouter);
app.use('/api/user', userRouter);
app.use('/api/artist', artistRouter);
app.use('/api/me', selfRouter);

/* Initialize server */
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
