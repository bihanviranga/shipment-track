import { Request, Response } from 'express';
import authService from '@/services/authService';
import type { RegisterInputDto } from '@/dto/authDto';

const register = async (req: Request, res: Response) => {
  const payload = req.body as RegisterInputDto;
  const createdUser = await authService.register(payload);

  // Remove fields unwanted for this endpoint
  const response = {
    ...createdUser,
    createdAt: undefined,
    updatedAt: undefined,
    passwordHash: undefined,
  };

  res.json(response);
};

const login = async (req: Request, res: Response) => {
  await authService.login();
  res.json({ endpoint: 'login' });
};

export default {
  register,
  login,
};
