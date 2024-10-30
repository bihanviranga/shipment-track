import db from '@/db';
import { CreateShipmentDto } from '@/dto/shipmentDto';
import { ShipmentStatus } from '@/consts/shipment';
import { ApiError, ErrorCode } from '@/util/error';
import { UserRole } from '@/consts/user';

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

const getAllShipments = async (userID: string, userRole: UserRole) => {
  const queryCondition: { senderID?: string } = {};

  if (userRole === UserRole.CLIENT) {
    queryCondition.senderID = userID;
  }

  const shipments = await db.shipment.findMany({
    where: queryCondition,
  });

  return shipments;
};

export default {
  createShipment,
  getAllShipments,
};
