import { createAction, props } from '@ngrx/store';
import { Book } from './book';

export const invokeBooksApi = createAction(
  '[Books API] invoke books fetch api'
);

export const booksFetchApiSuccess = createAction(
  '[Books API] books fetch api success',
  props<{ allBooks: Book[] }>()
);

export const invokeSaveNewBookApi = createAction(
  '[Books Api] save books api invoke',
  props<{ payload: Book }>()
);

export const saveNewBookApiSucess = createAction(
  '[Books Api] save books api success',
  props<{ newBook: Book }>()
);
