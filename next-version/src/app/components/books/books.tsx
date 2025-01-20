"use client";

import './books.scss';
import React, { Component } from 'react';
import type { Book } from '../../services/open-library/dto/open-library.dto';
import type { Book as BookModel } from '../../services/prisma/dto/schema.dto';
import { saveBook, removeBook } from './actions';
import { AlertComponent } from '../alert/alert';

interface BooksComponentProps {
  books: Array<Partial<Book>> | Array<Partial<BookModel>>;
  searchResult: boolean;
}

interface BooksComponentState {
  bookList: Array<Partial<Book>> | Array<Partial<BookModel>>;
  alertMessage: string;
  alertType: 'success' | 'danger' | 'warning' | 'info';
}

export class BooksComponent extends Component<BooksComponentProps, BooksComponentState> {
  constructor(props: BooksComponentProps) {
    super(props);
    this.state = {
      bookList: props.books,
      alertMessage: '',
      alertType: 'success',
    };
  }

  async addBook(book: Partial<Book> | Partial<BookModel>) {
    const result = await saveBook(book as Partial<Book>);
    const message = result.success ? `Book added: ${result.book?.title}` : `Error adding book: ${book?.title}, verify you are logged in`;
    this.setState({
      alertMessage: message,
      alertType: result.success ? 'success' : 'danger',
    });
  }

  async deleteBook(bookId: string) {
    const result = await removeBook(bookId);
    const idToRemove = result.book?.id;
    const message = result.success ? `Book removed: ${result.book?.title}` : `Error removing book, try later`;
    const newBooks = this.state.bookList.filter((bookList) => 'id' in bookList && bookList.id !== idToRemove);
    this.setState({
      bookList: newBooks as unknown as Array<Partial<Book>>,
      alertMessage: message,
      alertType: result.success ? 'success' : 'danger',
    });
  }

  renderBookLine(book: Partial<Book> | Partial<BookModel>, index: number, searchResult: boolean) {
    return (
      <tr key={'id' in book && book.id || book.key}>
        <th scope="row">{index + 1}</th>
        <td>{book.title}</td>
        <td>{book.author_name}</td>
        <td>{book.first_publish_year}</td>
        <td>
          {searchResult ? (
            <button className="btn btn-success" onClick={() => this.addBook(book)}>
              Add
            </button>
          ) : (
            <button className="btn btn-danger" onClick={() => 'id' in book && this.deleteBook(book.id as string)}>
              Remove
            </button>
          )}
        </td>
      </tr>
    );
  }

  render() {
    return (
      <div>
        <AlertComponent message={this.state.alertMessage} type={this.state.alertType} duration={3000} />
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
            {this.state.bookList.map((book, index) => this.renderBookLine(book, index, this.props.searchResult))}
          </tbody>
        </table>
      </div>
    );
  }
}