// TypeScript interfaces based on Prisma schema

export interface User {
    id: string;
    email: string;
    password: string;
    books: Book[];
  }
  
  export interface Book {
    id: string;
    title: string;
    key: string;
    cover_i?: string | null;
    author_name?: string | null;
    first_publish_year?: number | null;
    createdBy: User;
    createdById: string;
  }