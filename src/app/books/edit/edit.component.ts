import { Component, OnInit } from '@angular/core';
import { Book } from '../store/book';
import { Store, select } from '@ngrx/store';
import { selectBookById } from '../store/book.selector';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { invokeUpdateBookApi } from '../store/book.action';
import { AppState } from 'src/app/shared/store/appstate';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setApiStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  book: Book = {
    id: 0,
    title: '',
    author: '',
    cost: 0,
  };

  constructor(
    private store: Store,
    private appStore: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    let fetchFormData$ = this.activatedRoute.paramMap.pipe(
      switchMap((param) => {
        var id = Number(param.get('id'));
        return this.store.pipe(select(selectBookById(id)));
      })
    );

    fetchFormData$.subscribe((data) => {
      if (data) {
        this.book = { ...data };
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  UpdateBook() {
    this.store.dispatch(invokeUpdateBookApi({ payload: { ...this.book } }));

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
