import { Request, Response } from 'express';

export const getAllShipments = async (req: any, res: Response): Promise<void> => {
  console.log('[getallshipments] req.user:', req.user);
  res.json({ endpoint: 'getAllShipments' });
};

export const getShipmentById = async (req: Request, res: Response): Promise<void> => {
  res.json({ endpoint: 'getShipmentById' });
};

export const createShipment = async (req: Request, res: Response): Promise<void> => {
  res.json({ endpoint: 'createShipment' });
};

export const updateShipment = async (req: Request, res: Response): Promise<void> => {
  res.json({ endpoint: 'updateShipment' });
};
