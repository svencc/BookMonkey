import { Component, OnInit } from '@angular/core';

import { Book } from '../shared/book';
import { BookStoreService } from './../shared/book-store.service';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
})
export class BookListComponent implements OnInit {
  books: Book[];
  private bookStoreService: BookStoreService;

  constructor(bookStoreService: BookStoreService) {
    this.bookStoreService = bookStoreService;
  }

  ngOnInit() {
    this.bookStoreService.getAll().subscribe(result => this.books = result);
  }
}
