import { Router } from 'express';
import { getMany, getOne } from './artist.controllers';

const router = Router();

router.get('/', getMany);
router.get('/:id', getOne);

export default router;
