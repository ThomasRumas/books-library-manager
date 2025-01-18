// Import the Prisma client
import { PrismaClient } from "@prisma/client";
import * as crypto from "crypto";
import type { Book } from "@prisma/client";
import type { Book as BookAPI } from "../open-library/dto/open-library.dto";

const prisma = new PrismaClient();

/**
 * Create user by email.
 * @param email - The email of the user.
 * @param email - The password of the user.
 * @returns The user.
 */
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

/**
 * Save a user by email.
 * @param id - The ID of the user who is saving the book.
 * @returns The user.
 */
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

/**
 * Find user by id.
 * @param id - The ID of the user who is saving the book.
 * @returns The user.
 */
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

/**
 * Save a book for a user.
 * @param userId - The ID of the user who is saving the book.
 * @param bookData - The details of the book to save.
 * @returns The created book.
 */
export async function saveBookForUser(userId: string, bookData: Partial<BookAPI>): Promise<Book> {
  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Create and associate the book with the user
    const newBook = await prisma.book.create({
      data: {
        title: bookData.title || 'Unknown',
        key: bookData.key || 'Unknown',
        cover_i: `${bookData.cover_i}`,
        author_name: bookData.author_name ? bookData.author_name[0] : 'Unknown',
        first_publish_year: bookData.first_publish_year,
        createdBy: { connect: { id: userId } },
      },
    });

    return newBook;
  } catch (error) {
    console.error('Error saving book for user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Remove a book for a user.
 * @param userId - The ID of the user who owns the book.
 * @param bookId - The ID of the book to remove.
 * @returns The deleted book.
 */
export async function removeBookForUser(userId: string, bookId: string) {
  try {
    // Check if the book exists and is associated with the user
    const book = await prisma.book.findFirst({
      where: {
        id: bookId,
        createdById: userId,
      },
    });

    if (!book) {
      throw new Error('Book not found or does not belong to the user');
    }

    // Delete the book
    const deletedBook = await prisma.book.delete({
      where: {
        id: bookId,
      },
    });

    return deletedBook;
  } catch (error) {
    console.error('Error removing book for user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Remove a book for a user.
 * @param userId - The ID of the user who owns the book.
 * @returns Array of books from specific user.
 */
export async function getBooksByUser(userId: string): Promise<Partial<Book>[]> {
  try {
    const books = await prisma.book.findMany({
      where: {
        createdById: userId,  // Filter books by the userId
      },
    });

    return books;
  } catch (error) {
    console.error('Error fetching books for user:', error);
    throw new Error('Error fetching books');
  } finally {
    await prisma.$disconnect();
  }
}
