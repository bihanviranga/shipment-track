import { Request, Response } from 'express';

export const register = async (req: Request, res: Response): Promise<void> => {
  res.json({ endpoint: 'register' });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  res.json({ endpoint: 'login' });
};
