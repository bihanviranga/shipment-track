import shipmentService from '@/services/shipmentService';
import { NextFunction, Request, Response } from 'express';

const trackShipment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const trackingNumber = req.params.trackingNumber;
    const response = await shipmentService.trackShipment(trackingNumber);
    res.json({ data: response });
  } catch (error) {
    next(error);
  }
};

export default {
  trackShipment,
};
