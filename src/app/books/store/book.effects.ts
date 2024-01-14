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
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/appstate';
import { setApiStatus } from 'src/app/shared/store/app.action';

@Injectable()
export class BookEffects {
  constructor(
    private actions$: Actions,
    private bookService: BooksService,
    private appStore: Store<AppState>
  ) {}

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
        this.appStore.dispatch(
          setApiStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.bookService.add(action.payload).pipe(
          map((data) => {
            this.appStore.dispatch(
              setApiStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveNewBookApiSucess({ newBook: data });
          })
        );
      })
    )
  );
}
