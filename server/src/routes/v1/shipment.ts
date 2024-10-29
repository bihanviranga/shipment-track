import express from 'express';
import { createShipment, getAllShipments, getShipmentById, updateShipment } from '@/controllers/shipmentController';

const router = express.Router();

router.get('/', getAllShipments);
router.get('/:id', getShipmentById);
router.post('/', createShipment);
router.put('/:id', updateShipment);

export default router;
