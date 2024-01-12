import { Injectable } from '@angular/core';
import { BooksService } from '../Services/books.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  booksFetchApiSuccess,
  invokeBooksApi,
  invokeSaveNewBookApi,
  saveNewBookApiSucess,
} from './book.action';
import { map, switchMap } from 'rxjs';

@Injectable()
export class BookEffects {
  constructor(private actions$: Actions, private bookService: BooksService) {}

  loadAllBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeBooksApi),
      switchMap(() => {
        return this.bookService
          .get()
          .pipe(map((data) => booksFetchApiSuccess({ allBooks: data })));
      })
    )
  );

  saveNewBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeSaveNewBookApi),
      switchMap((action) => {
        console.log(action.payload);
        return this.bookService
          .add(action.payload)
          .pipe(map((data) => saveNewBookApiSucess({ newBook: data })));
      })
    )
  );
}
