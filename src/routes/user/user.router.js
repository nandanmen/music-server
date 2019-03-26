import { Router } from 'express';
import albumRouter from './album/album.router';
import playlistRouter from './playlist/playlist.router';
import controllers from './user.controllers';

const router = Router();

router.get('/', controllers.getMany);

router
  .route('/:id')
  .get(controllers.getOne)
  .post(controllers.followOne)
  .delete(controllers.unfollowOne);

router.use('/:id/playlist', playlistRouter);
router.use('/:id/album', albumRouter);

export default router;
