import prisma from '@/lib/prisma';
import type { Book } from '@prisma/client';

export default defineEventHandler(async (event) => {
  try {
    // Use `readBody` to read the body of the POST request
    const { bookId } = await readBody(event);
    const userId = getCookie(event, 'user');

    if (!bookId) {
      throw createError({
        statusCode: 400, // HTTP status code
        statusMessage: 'Bad Request', // Short message
        message: 'The book id is required.', // Optional detailed error message
      });
    }

    if (!userId) {
      throw createError({
        statusCode: 400, // HTTP status code
        statusMessage: 'Bad Request', // Short message
        message: 'User ID not found in cookies', // Optional detailed error message
      });
    }
    const saveBook = await removeBookForUser(userId as string, bookId);
    return {
      book: saveBook as Book,
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

async function removeBookForUser(userId: string, bookId: string) {
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
