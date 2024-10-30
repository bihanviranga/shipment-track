import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateRequest =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { success, error } = schema.safeParse(req.body);

    if (!success) {
      const errors: any = {};
      error.errors.forEach((err) => {
        const key = err.path[0] ?? 'message';
        const val = err.message;
        errors[key] = val;
      });
      res.status(400).json({
        // error: error.errors.map((t) => `${t.path[0] ?? ''}: ${t.message}`).join(', '),
        errors,
      });
      return;
    }

    next();
  };
