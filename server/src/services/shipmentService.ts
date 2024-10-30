import db from '@/db';
import { CreateShipmentDto, UpdateShipmentDto } from '@/dto/shipmentDto';
import { ShipmentStatus } from '@/consts/shipment';
import { ApiError, ErrorCode } from '@/util/error';
import { UserRole } from '@/consts/user';

const createShipment = async (payload: CreateShipmentDto, userID: string) => {
  // When creating a new shipment, set the status as 'PROCESSING'.
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
    include: { status: true },
  });

  return createdShipment;
};

const getAllShipments = async (userID: string, userRole: UserRole) => {
  const queryCondition: { senderID?: string } = {};

  // If it is a client, only that client's shipments should be shown.
  if (userRole === UserRole.CLIENT) {
    queryCondition.senderID = userID;
  }

  const shipments = await db.shipment.findMany({
    where: queryCondition,
    include: { status: true },
  });

  return shipments;
};

const getShipmentByID = async (shipmentID: string, userID: string, userRole: UserRole) => {
  const queryCondition: any = {
    shipmentID,
  };

  // If it is a client, only that client's shipments should be shown.
  if (userRole === UserRole.CLIENT) {
    queryCondition.senderID = userID;
  }

  const shipment = await db.shipment.findUnique({
    where: queryCondition,
    include: {
      status: true,
    },
  });

  if (!shipment) {
    throw new ApiError(ErrorCode.NOT_FOUND, 'Shipment with given ID not found');
  }

  return shipment;
};

const updateShipment = async (shipmentID: string, payload: UpdateShipmentDto) => {
  const updatedShipment = await db.shipment.update({
    where: { shipmentID: shipmentID },
    data: {
      statusID: payload.statusID,
    },
    include: {
      status: true,
    },
  });

  return updatedShipment;
};

export default {
  createShipment,
  getAllShipments,
  getShipmentByID,
  updateShipment,
};
