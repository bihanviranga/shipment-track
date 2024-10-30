import express from 'express';
import shipmentController from '@/controllers/shipmentController';
import { validateRequest } from '@/middleware/requestValidation';
import { createShipmentSchema } from '@/dto/shipmentDto';

const router = express.Router();

router.get('/', shipmentController.getAllShipments);
router.get('/:shipmentID', shipmentController.getShipmentByID);
router.post('/', validateRequest(createShipmentSchema), shipmentController.createShipment);
router.put('/:id', shipmentController.updateShipment);

export default router;
