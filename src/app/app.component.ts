import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { SearchService } from './services/search.service';
import { CommonModule, NgFor } from '@angular/common';
import { BooksService } from './services/books.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  searchService = inject(SearchService);

  books = inject(BooksService).getBooks();

  inputControl = new FormControl();

  foundBooks = this.inputControl.valueChanges.pipe(
    map((value) => {
      const result = this.search(value);
      
      if (result.length === 0) {
        return this.books;
      } else {
        return result;
      }
    }),
    startWith(this.books),
  );

  private search(searchText: string) {
    return this.searchService.search(searchText);
  }
}
