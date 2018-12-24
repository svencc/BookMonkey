import { Injectable } from '@angular/core';

import { Book } from './book';
import { BookRaw } from './book-raw';
import { BookFactory } from './book-factory';


import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  private api = 'https://book-monkey2-api.angular-buch.com';
  private headers: HttpHeaders = new HttpHeaders();
  private books: Array<Book>;


  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  getAll(): Observable<Array<Book>> {
    return this.http
      .get<Array<BookRaw>>(`${this.api}/books`)
      .pipe(
        retry(3),
        map(rawBooks => rawBooks
          .map(rawBook => BookFactory.fromObject(rawBook)),
        ),
        catchError(this.errorHandler)
      );
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http
      .get<BookRaw>(`${this.api}/book/${isbn}`)
      .pipe(
        retry(3),
        map(rawBook => BookFactory.fromObject(rawBook)),
        catchError(this.errorHandler)
      );
  }

  create(book: Book): Observable<any> {
    return this.http
      .post(`${this.api}/book`, book, { responseType: 'text' })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  update(book: Book): Observable<any> {
    return this.http
      .put(`${this.api}/book/${book.isbn}`, book, { responseType: 'text' })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  remove(isbn: string): Observable<any> {
    return this.http
      .delete(`${this.api}/book/${isbn}`, { responseType: 'text' })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  private errorHandler(error: Error | any): Observable<any> {
    return Observable.throw(error);
  }
}
