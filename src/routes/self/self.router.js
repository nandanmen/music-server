import { Router } from 'express';
import controllers from './self.controllers';

const router = Router();

router.get('/', controllers.getSelf);

export default router;
