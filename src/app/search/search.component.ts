import { BookStoreService } from './../shared/book-store.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { Book } from '../shared/book';

@Component({
  selector: 'bm-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  @Output() bookSelected = new EventEmitter<Book>();
  keyup = new EventEmitter<string>();
  foundBooks: Array<Book> = [];
  isLoading: Boolean = false;

  constructor(private bookStoreService: BookStoreService) { }

  ngOnInit() {
    this.keyup.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(searchTerm => this.bookStoreService.getAllSearch(searchTerm)),
      tap(() => this.isLoading = false),
    )
    .subscribe(books => this.foundBooks = books);
  }

}
