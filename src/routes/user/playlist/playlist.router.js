import { Router } from 'express';
import controllers from './playlist.controller';

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

export default router;
