import { Component } from '@angular/core';
import { Book } from '../store/book';
import { BooksService } from '../Services/books.service';
import { Store, select } from '@ngrx/store';
import { invokeSaveNewBookApi } from '../store/book.action';
import { AppState } from 'src/app/shared/store/appstate';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Router } from '@angular/router';
import { setApiStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  constructor(
    private store: Store,
    private appStore: Store<AppState>,
    private router: Router
  ) {}
  newBook: Book = {
    id: 0,
    title: '',
    author: '',
    cost: 0,
  };

  SaveBook() {
    this.store.dispatch(invokeSaveNewBookApi({ payload: { ...this.newBook } }));

    let appStatus$ = this.appStore.pipe(select(selectAppState));
    appStatus$.subscribe((data) => {
      if (data.apiStatus === 'success') {
        this.appStore.dispatch(
          setApiStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '' } })
        );
        this.router.navigate(['/']);
      }
    });
  }
}
