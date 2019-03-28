import { Router } from 'express';
import { getMany, getOne, getFollowed } from './artist.controllers';

const router = Router();

router.get('/', getMany);
router.get('/:id', getOne);
router.get('/:id/followed', getFollowed);

export default router;
