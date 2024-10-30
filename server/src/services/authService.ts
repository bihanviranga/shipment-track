import bcrypt from 'bcrypt';
import db from '@/db';
import { RegisterInputDto } from '@/dto/authDto';

const PASSWORD_SALT_ROUNDS = parseInt(process.env.PASSWORD_SALT_ROUNDS || '10');

const register = async (payload: RegisterInputDto) => {
  try {
    const hashedPassword = await bcrypt.hash(payload.password, PASSWORD_SALT_ROUNDS);
    const createdUser = await db.user.create({
      data: {
        name: payload.name,
        address: payload.address,
        passwordHash: hashedPassword,
        email: payload.email,
      },
    });
    console.log('[authService]: Created user:', createdUser);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

const login = async () => {
  console.log('authService.login');
};

export default {
  register,
  login,
};
