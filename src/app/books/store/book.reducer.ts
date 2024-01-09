import { createReducer, on } from '@ngrx/store';
import { Book } from './book';
import { booksFetchApiSuccess } from './book.action';

export const initialState: ReadonlyArray<Book> = [];

export const bookReducer = createReducer(
  initialState,
  on(booksFetchApiSuccess, (state, { allBooks }) => {
    return allBooks;
  })
);
