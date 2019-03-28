import { Router } from 'express';
import { like, unlike, getLiked } from './likes.controllers';

const router = Router();

router.get('/', getLiked);
router.post('/', like);
router.delete('/:id', unlike);

export default router;
