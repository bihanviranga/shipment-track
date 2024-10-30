import express from 'express';
import authRouter from './auth';
import shipmentRouter from './shipment';
import statusRouter from './status';
import { verifyAuth } from '@/middleware/verifyAuth';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/shipment', verifyAuth, shipmentRouter);
router.use('/status', verifyAuth, statusRouter);

export default router;
