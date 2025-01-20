import { OpenLibraryService } from '../services/open-library';
import { lastValueFrom } from 'rxjs';
import type { SearchResponse } from '../services/open-library/dto/open-library.dto';

const openLibraryService = new OpenLibraryService();

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    if (!query?.q || typeof query?.q !== 'string') {
      throw createError({
        statusCode: 400, // HTTP status code
        statusMessage: 'Bad Request', // Short message
        message: 'The "q" query parameter is required.', // Optional detailed error message
      });
    }
    const data = await lastValueFrom(openLibraryService.searchBooks(query.q));
    return data as unknown as SearchResponse;
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500, // HTTP status code
      statusMessage: error.statusMessage || 'Internal Server Error', // Short message
      message: error.message || '', // Optional detailed error message
    });
  }
});
