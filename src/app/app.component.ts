import { Component } from '@angular/core';
import { Book } from './shared/book';
import { Router } from '@angular/router';

@Component({
  selector: 'bm-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  book: Book;

constructor(private router: Router) {}

  title = 'BookMonkey';
}
