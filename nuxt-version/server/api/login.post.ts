import prisma from '@/lib/prisma';
import * as crypto from "crypto";

export default defineEventHandler(async (event) => {
  // Use `readBody` to read the body of the POST request
  const body = await readBody(event);

  try {
    const hashedPassword = crypto
      .createHash("sha512")
      .update(body.password)
      .digest("hex");
    
    const user = await findUserByEmail(body.email, hashedPassword);

    setCookie(event, 'user', user.id, {
      path: '/', 
      sameSite: 'strict',
    });

    return {
      sucess: true
    }
  } catch (error: any) {
    console.error("Error logging in:", error);
    return {
      sucess: false,
      message: error.message
    }
  }
});

async function findUserByEmail(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if(password !== user?.password) {
      throw new Error("Invalid password");
    }
    return user;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}