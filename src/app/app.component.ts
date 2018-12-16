import { Component } from '@angular/core';
import { Book } from './shared/book';

@Component({
  selector: 'bm-root',
  template: `
    <bm-book-list *ngIf="listOn" (showDetailsEvent)="showDetails($event)"></bm-book-list>
    <bm-book-details *ngIf="detailsOn" [book] ="book" (showListEvent)="showList()"></bm-book-details>
  `
})
export class AppComponent {
  listOn = true;
  detailsOn = false;

  book: Book;

  title = 'BookMonkey';

  showList() {
    console.log('showList');
    this.book = undefined;
    this.listOn = true;
    this.detailsOn = false;
  }

  showDetails(book: Book) {
    console.log('showDetails');
    this.book = book;
    this.listOn = false;
    this.detailsOn = true;
  }
}
