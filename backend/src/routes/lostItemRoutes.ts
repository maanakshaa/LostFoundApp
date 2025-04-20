import express from 'express';
import * as LostItemController from '../controllers/lostItemController';

const router = express.Router();

router
  .route('/')
  .get(LostItemController.getLostItems)
  .post(LostItemController.postLostItem);

router
  .route('/:id')
  .get(LostItemController.getLostItem)
  .put(LostItemController.putLostItem)
  .delete(LostItemController.deleteLostItem);

export default router;
