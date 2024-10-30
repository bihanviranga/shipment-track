import { NextFunction, Request, Response } from 'express';
import authService from '@/services/authService';
import type { LoginInputDto, RegisterInputDto } from '@/dto/authDto';

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

  res.status(201).json({ data: response });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body as LoginInputDto;
    const response = await authService.login(payload);
    res.json({ data: response });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
};
