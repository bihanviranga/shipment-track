import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';

export const verifyAuth = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({
      message: 'Not authorized. Please login',
    });
    return;
  }

  jwt.verify(token, JWT_SECRET, (error: any, user: any) => {
    if (error) {
      res.status(403).json({
        message: 'Not authorized',
      });
      return;
    }
    req.user = user;
    next();
  });
};
