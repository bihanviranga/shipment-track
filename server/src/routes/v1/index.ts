import express from 'express';
import authRouter from './auth';
import shipmentRouter from './shipment';
import statusRouter from './status';
import trackingRouter from './tracking';
import { verifyAuth } from '@/middleware/verifyAuth';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/shipment', verifyAuth, shipmentRouter);
router.use('/status', verifyAuth, statusRouter);
router.use('/track', trackingRouter);

export default router;
