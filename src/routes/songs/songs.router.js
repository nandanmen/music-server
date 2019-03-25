import { Router } from 'express';
import controllers from './songs.controllers';

const router = Router();

/* Public song routes */
router.get('/', controllers.getLiked);
router.get('/:id', controllers.getOne);

/* Artist only song routes */
router.use('/me', controllers.authorize);

router
  .route('/me')
  .get(controllers.getMany)
  .post(controllers.createOne);

router
  .route('/me/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.deleteOne);

export default router;
