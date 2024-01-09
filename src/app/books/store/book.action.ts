import { createAction, props } from '@ngrx/store';
import { Book } from './book';

export const invokeBooksApi = createAction(
  '[Books API] invoke books fetch api'
);

export const booksFetchApiSuccess = createAction(
  '[Books API] books fetch api success',
  props<{ allBooks: Book[] }>()
);
