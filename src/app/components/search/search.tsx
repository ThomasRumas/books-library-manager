"use client";

import './search.scss';
import { useState } from "react";
import type { Book } from "@/app/services/open-library/dto/open-library.dto";

export function SearchComponent() {
    const [books, setBooks] = useState<Book[]>([]);
    const [search, setSearch] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    return(
        <div className="container">
            <div className="row">
                <div className="col-8">
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="search" placeholder="name@example.com" onChange={(event) => setSearch(event.target.value)} />
                        <label htmlFor="search">Enter your research</label>
                    </div>
                </div>
                <div className="col-4">
                    <button type="button" className="btn btn-primary" onClick={async (event) => {
                        setIsLoading(true);
                        setBooks([]);
                        setBooks(await searchBooks(event, search));
                        setIsLoading(false);
                    }}>Primary</button>
                </div>
                {isLoading && <Spinner />}
                {books.length > 0 && listBooks(books)}
            </div>
        </div>
    )
}

function Spinner() {
    return (
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

function listBooks(books: Book[]) {
    return (
        <ul className="list-group">
            {books.map((book) => (
                <li className="list-group-item" key={book.key}>
                    <h5>{book.title}</h5>
                    <p>{book.author_name}</p>
                </li>
            ))}
        </ul>
    )
}

async function searchBooks(e: React.MouseEvent, prmSearch: string) {
    e.preventDefault();
    try {
        const response = await fetch(`/api/search?q=${prmSearch}`);
        const data = await response.json();
        return data?.docs;
    } catch (error) {
        console.error(error);
    }
}