import { createReducer, on } from '@ngrx/store';
import { Book } from './book';
import {
  booksFetchApiSuccess,
  deleteBookApiSucess,
  saveNewBookApiSucess,
  updateBookApiSucess,
} from './book.action';

export const initialState: ReadonlyArray<Book> = [];

export const bookReducer = createReducer(
  initialState,
  on(booksFetchApiSuccess, (state, { allBooks }) => {
    return allBooks;
  }),
  on(saveNewBookApiSucess, (state, { newBook }) => {
    let newState = [...state, newBook];
    return newState;
  }),
  on(updateBookApiSucess, (state, { updatedBook }) => {
    let newState = state.filter((_) => _.id !== updatedBook.id);
    newState.unshift(updatedBook);
    return newState;
  }),
  on(deleteBookApiSucess, (state, { deletedBookId }) => {
    let newState = state.filter((_) => _.id !== deletedBookId);
    return newState;
  })
);
