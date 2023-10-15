import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';
import { BooksService } from './books.service';

describe('SearchService', () => {
  let service: SearchService;

  let booksServiceMock!: { getBooks: jest.Mock };

  beforeEach(() => {
    booksServiceMock = {
      getBooks: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: BooksService,
          useValue: booksServiceMock,
        },
      ],
    });

    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when there is NO data', () => {
    it('should return an empty array', () => {
      booksServiceMock.getBooks.mockReturnValue([]);

      expect(service.search('test')).toEqual([]);

      expect(service.search('')).toEqual([]);
    });
  });

  describe('when there is data', () => {
    it('should return only one item', () => {
      booksServiceMock.getBooks.mockReturnValue(['test', 'other thing']);

      expect(service.search('test')).toEqual(['test']);
    });

    it('should return 2 items', () => {
      booksServiceMock.getBooks.mockReturnValue([
        'test',
        'other thing',
        'test',
      ]);

      expect(service.search('test')).toEqual(['test', 'test']);
    });

    it('should return an empty array', () => {
      booksServiceMock.getBooks.mockReturnValue(['test', 'other thing']);

      expect(service.search('abc')).toEqual([]);
    });

    describe('case sensitive check', () => {
      it('should return an array with 2 items', () => {
        booksServiceMock.getBooks.mockReturnValue(['TeSt', 'other tEst']);

        expect(service.search('tes')).toEqual(['TeSt', 'other tEst']);
      });

      it('should return an empty array', () => {
        booksServiceMock.getBooks.mockReturnValue(['TeSt', 'other tEst']);

        expect(service.search('tt')).toEqual([]);
      });
    });
  });

  describe('when the search text param is invalid', () => {
    it('should return an empty array', () => {
      booksServiceMock.getBooks.mockReturnValue(['test', 'other thing', '']);

      expect(service.search('')).toEqual([]);
    });
  });
});
