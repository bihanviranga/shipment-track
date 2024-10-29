import express from 'express';
import authRouter from './auth';
import shipmentRouter from './shipment';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/shipment', shipmentRouter);

export default router;
