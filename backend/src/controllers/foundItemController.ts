import { Request, Response } from 'express';
import * as model from '../models/foundItemModel';

export const getFoundItems = async (req: Request, res: Response) => {
  const items = await model.getAllFoundItems();
  res.json(items);
};

export const getFoundItem = async (req: Request, res: Response) => {
  const item = await model.getFoundItemById(Number(req.params.id));
  if (item) return res.json(item);
  return res.status(404).json({ message: 'Found item not found' });
};

export const postFoundItem = async (req: Request, res: Response) => {
  const result = await model.createFoundItem(req.body);
  res.status(201).json({ id: result.lastID });
};

export const putFoundItem = async (req: Request, res: Response) => {
  await model.updateFoundItem(Number(req.params.id), req.body);
  res.json({ message: 'Found item updated' });
};

export const deleteFoundItem = async (req: Request, res: Response) => {
  await model.deleteFoundItem(Number(req.params.id));
  res.json({ message: 'Found item deleted' });
};

