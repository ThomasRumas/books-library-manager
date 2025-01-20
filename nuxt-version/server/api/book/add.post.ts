import prisma from '@/lib/prisma';
import type { Book } from '@prisma/client';
import type { Book as BookAPI } from '../../services/open-library/dto/open-library.dto';

export default defineEventHandler(async (event) => {
  try {
    // Use `readBody` to read the body of the POST request
    const body = await readBody(event);
    const userId = getCookie(event, 'user');

    if (!body?.book) {
      throw createError({
        statusCode: 400, // HTTP status code
        statusMessage: 'Bad Request', // Short message
        message: 'The book body is required.', // Optional detailed error message
      });
    }

    if (!userId) {
      throw createError({
        statusCode: 400, // HTTP status code
        statusMessage: 'Bad Request', // Short message
        message: 'User ID not found in cookies', // Optional detailed error message
      });
    }
    const saveBook = await saveBookForUser(userId as string, body.book);
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

async function saveBookForUser(
  userId: string,
  bookData: Partial<BookAPI>
): Promise<Book> {
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
