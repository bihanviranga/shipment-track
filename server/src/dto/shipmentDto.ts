import { z } from 'zod';

export const createShipmentSchema = z
  .object({
    recipientName: z.string().min(1),
    recipientAddress: z.string().min(1),
    trackingNumber: z.string().min(1),
  })
  .strict();

export type CreateShipmentDto = z.infer<typeof createShipmentSchema>;
