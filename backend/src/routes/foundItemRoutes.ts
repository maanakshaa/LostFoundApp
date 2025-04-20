import express from 'express';
import * as controller from '../controllers/foundItemController';

const router = express.Router();

router
  .route('/')
  .get(controller.getFoundItems)
  .post(controller.postFoundItem);

router
  .route('/:id')
  .get(controller.getFoundItem)
  .put(controller.putFoundItem)
  .delete(controller.deleteFoundItem);

export default router;
