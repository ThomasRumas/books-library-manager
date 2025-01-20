import prisma from '@/lib/prisma';
import * as crypto from 'crypto';

export default defineEventHandler(async (event) => {
  // Use `readBody` to read the body of the POST request
  const body = await readBody(event);

  try {
    await createUser(body.email, body.password);
    return {
      sucess: true,
    };
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500, // HTTP status code
      statusMessage: error.statusMessage || 'Internal Server Error', // Short message
      message: error.message || '', // Optional detailed error message
    });
  }
});

async function createUser(email: string, password: string) {
  try {
    // Encrypt the password using crypto with sha512
    const hashedPassword = crypto
      .createHash('sha512')
      .update(password)
      .digest('hex');

    const userExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist) {
      throw new Error('User already exists');
    }

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
