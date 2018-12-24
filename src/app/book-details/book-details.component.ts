import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from './../shared/book';
import { BookFactory } from './../shared/book-factory';
import { BookStoreService } from './../shared/book-store.service';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
})
export class BookDetailsComponent implements OnInit {
  book: Book = BookFactory.empty();

  constructor(
    private route: ActivatedRoute,
    private bookStoreService: BookStoreService,
    private router: Router
    ) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.bookStoreService.getSingle(params['isbn'])
      .subscribe(b => this.book = b);
  }

  getRating(num: number): Array<number> {
        return new Array(num);
  }

  removeBook() {
    if (confirm('Buch wirklich löschen?')) {
      this.bookStoreService.remove(this.book.isbn)
        .subscribe(res => this.router.navigate(['../'], { relativeTo: this.route }));
    }
  }
}
