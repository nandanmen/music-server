import { Router } from 'express';
import { followOne, unfollowOne } from './user.controllers';

const router = Router();

router
  .route('/:id')
  .post(followOne)
  .delete(unfollowOne);

export default router;
