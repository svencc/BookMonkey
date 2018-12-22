import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from './../shared/book';
import { BookStoreService } from './../shared/book-store.service';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
})
export class BookDetailsComponent implements OnInit {
  private book: Book | void;

  constructor(private route: ActivatedRoute, private bookStoreService: BookStoreService) {
  }

  ngOnInit(): void {
    this.book = this.bookStoreService.getBook(this.route.snapshot.params['isbn']);
  }

  getRating(num: number): Array<number> {
        return new Array(num);
  }
}
