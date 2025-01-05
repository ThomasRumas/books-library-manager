import styles from "./page.module.scss";
import { SearchComponent } from "./components/search/search";

export default function Home() {
  const books = [];
  return (
    <div>
      <div className={`container-fluid gx-0 ${styles.hero}`}>
        <h1>Welcome to Book Library Manager Web App</h1>
        <p>This simple website will allow you to search and manage your books collection using Open Book API</p>
      </div>
      {books.length > 0 ? renderBooksLibrary() : renderSearchComponent()}
    </div>
  );
}


function renderSearchComponent() {
  return(
    <SearchComponent />
  )
}

function renderBooksLibrary() {
  return(
    <div>Library</div>
  )
}