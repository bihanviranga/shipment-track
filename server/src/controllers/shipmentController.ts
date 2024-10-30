import { CreateShipmentDto } from '@/dto/shipmentDto';
import { Request, Response } from 'express';
import shipmentService from '@/services/shipmentService';

const getAllShipments = async (req: any, res: Response): Promise<void> => {
  console.log('[getallshipments] req.user:', req.user);
  res.json({ endpoint: 'getAllShipments' });
};

const getShipmentById = async (req: Request, res: Response): Promise<void> => {
  res.json({ endpoint: 'getShipmentById' });
};

const createShipment = async (req: any, res: Response): Promise<void> => {
  const payload = req.body as CreateShipmentDto;
  const shipment = await shipmentService.createShipment(payload, req.user.userID);
  res.status(201).json({ shipment });
};

const updateShipment = async (req: Request, res: Response): Promise<void> => {
  res.json({ endpoint: 'updateShipment' });
};

export default {
  getAllShipments,
  getShipmentById,
  createShipment,
  updateShipment,
};
