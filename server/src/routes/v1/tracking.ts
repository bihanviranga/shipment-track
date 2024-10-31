import express from 'express';
import trackingController from '@/controllers/trackingController';

const router = express.Router();

router.get('/:trackingNumber', trackingController.trackShipment);

export default router;
