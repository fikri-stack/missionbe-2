import prisma from '../config/db';
import { hashPassword } from '../utils/passwordHash';
import { generateUuidToken } from '../utils/generateUuidToken';

export const createUser = async (userData: {
  fullname: string;
  email: string;
  password: string;
}) => {
  const hashedPassword = await hashPassword(userData.password);
  const verificationToken = generateUuidToken();

  return await prisma.user.create({
    data: {
      fullName: userData.fullname,
      email: userData.email,
      password: hashedPassword,
      role: 'student',
      verificationToken
    }
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const findUserByVerificationToken = async (token: string) => {
  return await prisma.user.findFirst({ where: { verificationToken: token } });
};

export const verifyUserEmail = async (userId: number) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { isVerified: true, verificationToken: null }
  });
};