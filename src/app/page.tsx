import styles from "./page.module.scss";
import { cookies } from 'next/headers'
import { SearchComponent } from "./components/search/search";
import { getBooksByUser } from "./services/prisma";
import { BooksComponent } from "./components/books/books";
import type { Book } from "./services/prisma/dto/schema.dto";

export default async function Home() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('user')?.value;
  let books: Partial<Book>[] = [];

  if(userId) {
    books = await getBooksByUser(userId);
  }
  
  return (
    <div>
      <div className={`container-fluid gx-0 ${styles.hero}`}>
        <h1>Welcome to Book Library Manager Web App</h1>
        <p>This simple website will allow you to search and manage your books collection using Open Book API</p>
      </div>
      {books.length > 0 ? renderBooksLibrary(books) : renderSearchComponent()}
    </div>
  );
}


function renderSearchComponent() {
  return(
    <SearchComponent />
  )
}

function renderBooksLibrary(books: Partial<Book>[]) {
  //TODO: Need to add alert component
  return(
    <BooksComponent books={books} searchResult={false} />
  )
}