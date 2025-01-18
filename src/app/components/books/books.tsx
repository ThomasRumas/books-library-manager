"use client";

import './books.scss';
import React, { useState } from 'react';
import type { Book } from '../../services/open-library/dto/open-library.dto';
import type { Book as BookModel } from '../../services/prisma/dto/schema.dto';
import { saveBook, removeBook } from './actions';
import { AlertComponent } from '../alert/alert';

export function BooksComponent({
  books,
  searchResult,
}: {
  books: Array<Partial<Book>> | Array<Partial<BookModel>>;
  searchResult: boolean;
}) {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'danger' | 'warning' | 'info'>('success');

  async function addBook(book: Partial<Book> | Partial<BookModel>, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const result = await saveBook(book as Partial<Book>);
    const message = result.success ? `Book added: ${result.book?.title}` : `Error adding book: ${result.book?.title}`;
    setAlertMessage(message);
    setAlertType(result.success ? 'success' : 'danger');
  }

  async function deleteBook(bookId: string) {
    //TODO: Remove book from the list
    const result = await removeBook(bookId);
    console.log('Book removed:', result.success);
    console.log('Book:', result.book);
  }

  function renderBookLine(book: Partial<Book> | Partial<BookModel>, index: number, searchResult: boolean) {
    return (
      <tr key={'id' in book && book.id || book.key}>
        <th scope="row">{index + 1}</th>
        <td>{book.title}</td>
        <td>{book.author_name}</td>
        <td>{book.first_publish_year}</td>
        <td>
          {searchResult ? (
            <button className="btn btn-success" onClick={(e) => addBook(book, e)}>
              Add
            </button>
          ) : (
            <button className="btn btn-danger" onClick={() => 'id' in book && deleteBook(book.id as string)}>
              Remove
            </button>
          )}
        </td>
      </tr>
    );
  }

  return (
    <div>
      <AlertComponent message={alertMessage} type={alertType} duration={3000} />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Published</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => renderBookLine(book, index, searchResult))}
        </tbody>
      </table>
    </div>
  );
}