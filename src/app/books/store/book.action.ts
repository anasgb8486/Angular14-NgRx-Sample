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

export const invokeUpdateBookApi = createAction(
  '[Book Api] invoke update book api',
  props<{ payload: Book }>()
);

export const updateBookApiSucess = createAction(
  '[Books API] update book api success',
  props<{ updatedBook: Book }>()
);

export const invokeDeleteBookApi = createAction(
  '[Books API] invoke delete book api',
  props<{ bookId: number }>()
);

export const deleteBookApiSucess = createAction(
  '[Books Api] delete books api sucess',
  props<{ deletedBookId: number }>()
);
