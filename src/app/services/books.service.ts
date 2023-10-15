import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  #books =  ['Refactoring', 'Domain Driven Design', 'Design Patterns'];

  getBooks() {
    return this.#books;
  }

}
