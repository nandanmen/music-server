import { Router } from 'express';
import controllers from './songs.controllers';
import { authorizeArtist } from '../../utils/auth';

const router = Router();

/* Public song routes */
router.get('/', controllers.getLiked);
router.get('/:id', controllers.getOne);

/* Artist only song routes */
router.use('/me', authorizeArtist);

router
  .route('/me')
  .get(controllers.getMany)
  .post(controllers.createOne);

router
  .route('/me/:id')
  .put(controllers.updateOne)
  .delete(controllers.deleteOne);

export default router;
