import { Router } from 'express';
import controllers from './album.controllers';

const router = Router();

router.use('/', controllers.checkArtist);

router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne);

router
  .route('/:name')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.deleteOne);

export default router;
