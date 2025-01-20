import prisma from '@/lib/prisma';
import type { Book } from '@prisma/client';

export default defineEventHandler(async (event) => {
  try {
    const { userId } = getQuery(event);
    if (!userId) {
      throw createError({
        statusCode: 400, // HTTP status code
        statusMessage: 'Bad Request', // Short message
        message: 'User ID not found in cookies', // Optional detailed error message
      });
    }
    const books = await getBooksByUser(userId as string);
    return {
      books: books,
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

export async function getBooksByUser(userId: string): Promise<Partial<Book>[]> {
  try {
    const books = await prisma.book.findMany({
      where: {
        createdById: userId, // Filter books by the userId
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
