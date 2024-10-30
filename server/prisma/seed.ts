import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import 'dotenv/config';

let db = new PrismaClient();

const PASSWORD_SALT_ROUNDS = parseInt(process.env.PASSWORD_SALT_ROUNDS || '10');

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash('admin', PASSWORD_SALT_ROUNDS);
  const admin = await db.user.create({
    data: {
      email: 'admin@website.com',
      name: 'Admin',
      address: '1, Colombo, Sri Lanka',
      passwordHash: hashedPassword,
      role: 'Admin',
    },
  });
  console.log('[seed]: Created admin:', admin);
};

const populateShipmentStatus = async () => {
  const data = [
    { name: 'PROCESSING', description: 'Shipment is being processed.' },
    { name: 'READY TO SHIP', description: 'Shipment has been processed, and is ready to be shipped.' },
    { name: 'IN TRANSIT', description: 'Shipment is being transported.' },
    { name: 'DELIVERED', description: 'Shipment has been delivered.' },
    { name: 'DELIVERY FAILED', description: 'Delivery failed, awaiting re-try.' },
    { name: 'CANCELLED', description: 'Delivery of the shipment has been cancelled.' },
    { name: 'DELAYED', description: 'Delivery has been delayed.' },
  ];

  await db.shipmentStatus.createMany({
    data,
  });

  console.log('[seed] Created default statuses:', data);
};

const main = async () => {
  await createAdmin();
  await populateShipmentStatus();
};

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
