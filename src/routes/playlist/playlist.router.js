import { Router } from 'express';
import controllers from './playlist.controllers';

const router = Router();

router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne);

router
  .route('/:name')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.deleteOne);

router
  .route('/:name/:sid')
  .post(controllers.addSong)
  .delete(controllers.deleteSong);

export default router;
