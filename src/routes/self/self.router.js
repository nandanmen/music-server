import { Router } from 'express';
import controllers from './self.controllers';

const router = Router();

router
  .route('/')
  .get(controllers.getSelf)
  .put(controllers.updateSelf)
  .delete(controllers.deleteSelf);

export default router;
