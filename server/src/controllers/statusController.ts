import { Request, Response } from 'express';
import statusService from '@/services/statusService';

const getAllStatus = async (req: Request, res: Response) => {
  const status = await statusService.getAllStatus();
  res.json({ data: status });
};

export default {
  getAllStatus,
};
