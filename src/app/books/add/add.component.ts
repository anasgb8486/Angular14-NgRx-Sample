import { Component } from '@angular/core';
import { Book } from '../store/book';
import { BooksService } from '../Services/books.service';
import { Store } from '@ngrx/store';
import { invokeSaveNewBookApi } from '../store/book.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  constructor(private store: Store) {}
  newBook: Book = {
    id: 0,
    title: '',
    author: '',
    cost: 0,
  };

  SaveBook() {
    this.store.dispatch(invokeSaveNewBookApi({ payload: { ...this.newBook } }));
  }
}
