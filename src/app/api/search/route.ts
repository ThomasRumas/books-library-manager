import { SearchResponse } from "@/app/services/open-library/dto/open-library.dto";
import { OpenLibraryService } from "@/app/services/open-library";
import { NextRequest, NextResponse } from "next/server";
import { lastValueFrom } from "rxjs";

const service = new OpenLibraryService();

/**
 * API route handler for searching books using the Open Library API.
 * @param req - Next.js API request object.
 */
export async function GET(req: NextRequest): Promise<NextResponse>{
  const parsedUrl = new URL(req.url);
  const queryParams = new URLSearchParams(parsedUrl.search);
  const q = queryParams.get('q');

  if (!q || typeof q !== 'string') {
    return new NextResponse('Query parameter "q" is required and must be a string.', { status: 400 });
  }

  const data = await lastValueFrom(service.searchBooks(q));
  return NextResponse.json(data as unknown as SearchResponse);
}