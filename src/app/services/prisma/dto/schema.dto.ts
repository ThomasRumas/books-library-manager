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
    cover_i?: string;
    author_name?: string;
    first_publish_year?: number;
    createdBy: User;
    createdById: string;
  }