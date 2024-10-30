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

createAdmin()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
