import db from '@/db';
import { CreateShipmentDto } from '@/dto/shipmentDto';
import { ShipmentStatus } from '@/consts/shipment';
import { ApiError, ErrorCode } from '@/util/error';

const createShipment = async (payload: CreateShipmentDto, userID: string) => {
  const processingStatus = await db.shipmentStatus.findFirst({
    where: { name: ShipmentStatus.PROCESSING.valueOf() },
  });

  if (!processingStatus) {
    throw new ApiError(ErrorCode.SERVER_ERROR, 'Could not find processing status');
  }

  const createdShipment = await db.shipment.create({
    data: {
      senderID: userID,
      recipientName: payload.recipientName,
      recipientAddress: payload.recipientAddress,
      trackingNumber: payload.trackingNumber,
      statusID: processingStatus?.statusID,
    },
  });

  return createdShipment;
};

export default { createShipment };
