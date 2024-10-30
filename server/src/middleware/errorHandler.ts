import { ApiError } from '@/util/error';
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (error: ApiError, request: Request, response: Response, next: NextFunction) => {
  const status = error.status.valueOf();
  response.status(status).json({ message: error.message });
};
