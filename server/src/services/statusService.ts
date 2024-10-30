import db from '@/db';

const getAllStatus = async () => {
  const status = await db.shipmentStatus.findMany();
  return status;
};

export default {
  getAllStatus,
};
