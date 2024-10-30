import { CreateShipmentDto, UpdateShipmentDto } from '@/dto/shipmentDto';
import { NextFunction, Request, Response } from 'express';
import shipmentService from '@/services/shipmentService';
import { UserRole } from '@/consts/user';
import { ApiError, ErrorCode } from '@/util/error';

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

const updateShipment = async (req: any, res: Response, next: NextFunction) => {
  try {
    // Currently only admins can update shipments.
    const userRole = req.user.role as UserRole;
    if (userRole !== UserRole.ADMIN) {
      throw new ApiError(ErrorCode.FORBIDDEN, 'Not permitted to perform that action');
    }

    const shipmentID = req.params.shipmentID;
    const payload = req.body as UpdateShipmentDto;

    const response = await shipmentService.updateShipment(shipmentID, payload);
    res.json({ data: response });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllShipments,
  getShipmentByID,
  createShipment,
  updateShipment,
};
