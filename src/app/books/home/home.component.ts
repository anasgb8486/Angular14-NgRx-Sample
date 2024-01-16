import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectBooks } from '../store/book.selector';
import { invokeBooksApi, invokeDeleteBookApi } from '../store/book.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(invokeBooksApi());
  }

  books$ = this.store.pipe(select(selectBooks));

  delete(id: number) {
    const result = confirm('Are you sure to delete this book ?');
    if (result) {
      this.store.dispatch(invokeDeleteBookApi({ bookId: id }));
    }
  }
}
