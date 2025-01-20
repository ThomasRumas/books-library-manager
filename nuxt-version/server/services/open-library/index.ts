import axios from 'axios';
import { from, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import type { SearchResponse } from './dto/open-library.dto';

export class OpenLibraryService {
  private baseUrl: string;

  constructor(baseUrl = 'https://openlibrary.org') {
    this.baseUrl = baseUrl;
  }

  /**
   * Searches for books using the Open Library API.
   * @param query - The search query string.
   * @param maxRetries - Maximum number of retries in case of failure (default: 3).
   * @returns An Observable containing the API response.
   */
  searchBooks(query: string, maxRetries = 3) {
    const url = `${this.baseUrl}/search.json?q=${encodeURIComponent(query)}`;

    // Create an observable from the Axios Promise
    return from(axios.get(url)).pipe(
      map((response: { data: SearchResponse }) => response.data),
      retry(maxRetries), // Retry the request on failure
      catchError((error) => {
        console.error('Error occurred:', error.message);
        return throwError(
          () => new Error('Failed to fetch books from Open Library.')
        );
      })
    );
  }
}
