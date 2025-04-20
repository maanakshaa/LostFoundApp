import { Request, Response } from 'express';
import * as LostItemModel from '../models/lostItemModel';

export const getLostItems = async (_req: Request, res: Response) => {
  const items = await LostItemModel.getAllLostItems();
  res.json(items);
};

export const getLostItem = async (req: Request, res: Response) => {
  const item = await LostItemModel.getLostItemById(Number(req.params.id));
  if (item) res.json(item);
  else res.status(404).json({ message: 'Item not found' });
};

export const postLostItem = async (req: Request, res: Response) => {
  await LostItemModel.createLostItem(req.body);
  res.status(201).json({ message: 'Item created successfully' });
};

export const putLostItem = async (req: Request, res: Response) => {
  await LostItemModel.updateLostItem(Number(req.params.id), req.body);
  res.json({ message: 'Item updated successfully' });
};

export const deleteLostItem = async (req: Request, res: Response) => {
  await LostItemModel.deleteLostItem(Number(req.params.id));
  res.json({ message: 'Item deleted successfully' });
};
