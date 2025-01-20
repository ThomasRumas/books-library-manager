import styles from "./page.module.scss";
import hero from "../../public/hero.webp";
import Image from "next/image";
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
      <div className={styles.hero}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-6">
              <h1>Manage your book library easily</h1>
              <p>This simple website will allow you to search and manage your books collection using Open Book API</p>
            </div>
            <div className={`col-6 ${styles['txt-right']}`}>
              <Image src={hero} alt="" width={500} height={500} />
            </div>
          </div>
        </div>
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
  return(
    <div className={`${styles['margin-top']} container`}>
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Your Library</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <BooksComponent books={books} searchResult={false} />
        </div>
      </div>
    </div>
  )
}