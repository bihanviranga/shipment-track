import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '@/db';
import { LoginInputDto, RegisterInputDto } from '@/dto/authDto';
import { ApiError, ErrorCode } from '@/util/error';
import { UserRole } from '@/consts/user';

const PASSWORD_SALT_ROUNDS = parseInt(process.env.PASSWORD_SALT_ROUNDS || '10');
const JWT_SECRET = process.env.JWT_SECRET || '';

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
    console.log(`[authService] ${new Date()}: Created user:`, createdUser);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

const login = async (payload: LoginInputDto) => {
  try {
    const user = await db.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      throw new ApiError(ErrorCode.BAD_REQUEST, 'Invalid username/password');
    }

    const isValidPassword = await bcrypt.compare(payload.password, user.passwordHash);

    if (!isValidPassword) {
      throw new ApiError(ErrorCode.BAD_REQUEST, 'Invalid username/password');
    }

    const userRole = user.role === 'Admin' ? UserRole.ADMIN : UserRole.CLIENT;
    const token = jwt.sign({ userID: user.userID, email: user.email, role: userRole }, JWT_SECRET);
    console.log(`[authService] ${new Date()}: User ${payload.email} logged in`);

    return { token };
  } catch (error) {
    throw error;
  }
};

export default {
  register,
  login,
};
