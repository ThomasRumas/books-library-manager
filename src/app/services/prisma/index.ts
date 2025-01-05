// Import the Prisma client
import { PrismaClient } from "@prisma/client";
import * as crypto from "crypto";

const prisma = new PrismaClient();

// Function to create a user
export async function createUser(email: string, password: string) {
  try {
    // Encrypt the password using crypto with sha512
    const hashedPassword = crypto
      .createHash("sha512")
      .update(password)
      .digest("hex");

    const userExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist) {
      throw new Error("User already exists");
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
    console.error("Error creating user:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Function to find a user by email
export async function findUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Function to find a user by id
export async function findUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  } catch (error) {
    console.error("Error finding user by id:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
