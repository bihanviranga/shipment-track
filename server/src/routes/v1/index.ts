import express from 'express';
import authRouter from './auth';
import shipmentRouter from './shipment';
import { verifyAuth } from '@/middleware/verifyAuth';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/shipment', verifyAuth, shipmentRouter);

export default router;
