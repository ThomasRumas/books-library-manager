"use server";

import { saveBookForUser, removeBookForUser } from "../../../services/prisma/index";
import type { Book } from "../../../services/open-library/dto/open-library.dto";
import type { Book as BookModel } from "../../../services/prisma/dto/schema.dto";
import { cookies } from 'next/headers'

export async function saveBook(book: Partial<Book>) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('user')?.value;

    if (!userId) {
      throw new Error("User ID not found in cookies");
    }

    const saveBook = await saveBookForUser(userId, book);
    return {
        success: true,
        book: saveBook as BookModel,
    }
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    console.error("Error registering user:", error);
    return {
      success: false,
      error: error.message || "An error occurred during registration",
    };
  }
}

export async function removeBook(bookId: string) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('user')?.value;

    if (!userId) {
      throw new Error("User ID not found in cookies");
    }

    const removeBook = await removeBookForUser(userId, bookId);
    return {
        success: true,
        book: removeBook as BookModel,
    }
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    console.error("Error registering user:", error);
    return {
      success: false,
      error: error.message || "An error occurred during registration",
    };
  }
}
