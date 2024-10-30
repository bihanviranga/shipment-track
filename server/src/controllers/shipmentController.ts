import { CreateShipmentDto } from '@/dto/shipmentDto';
import { NextFunction, Request, Response } from 'express';
import shipmentService from '@/services/shipmentService';
import { UserRole } from '@/consts/user';

const getAllShipments = async (req: any, res: Response) => {
  const userID = req.user.userID;
  const userRole = req.user.role as UserRole;
  const shipments = await shipmentService.getAllShipments(userID, userRole);
  res.json({ data: shipments });
};

const getShipmentByID = async (req: any, res: Response, next: NextFunction) => {
  try {
    const userID = req.user.userID;
    const userRole = req.user.role as UserRole;
    const shipmentID = req.params.shipmentID;
    const shipment = await shipmentService.getShipmentByID(shipmentID, userID, userRole);
    res.json({ data: shipment });
  } catch (error) {
    next(error);
  }
};

const createShipment = async (req: any, res: Response) => {
  const payload = req.body as CreateShipmentDto;
  const shipment = await shipmentService.createShipment(payload, req.user.userID);
  res.status(201).json({ shipment });
};

const updateShipment = async (req: Request, res: Response) => {
  res.json({ endpoint: 'updateShipment' });
};

export default {
  getAllShipments,
  getShipmentByID,
  createShipment,
  updateShipment,
};
