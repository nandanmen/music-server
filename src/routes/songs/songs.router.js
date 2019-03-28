import { Router } from 'express';
import controllers from './songs.controllers';

const router = Router();

router.get('/', controllers.getMany);

export default router;
