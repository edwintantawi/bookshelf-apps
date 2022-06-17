class BookController {
  constructor({ repository, event }) {
    this._repository = repository;
    this._event = event;

    this.getAllBooks = this.getAllBooks.bind(this);
    this.addNewBook = this.addNewBook.bind(this);
  }

  _parseForm(form) {
    const payload = {};
    const formData = new FormData(form);

    for (const key of formData.keys()) {
      payload[key] = formData.get(key);
    }

    return payload;
  }

  getAllBooks() {
    const books = this._repository.getBooks();
    const completedBookList = document.getElementById('book-list:complete');
    const inCompletedBookList = document.getElementById('book-list:incomplete');

    const isComplete = (book) => book.isComplete;
    const isInComplete = (book) => !book.isComplete;

    const completedBooks = books.filter(isComplete).map(createBookTemplate);
    const inCompletedBooks = books.filter(isInComplete).map(createBookTemplate);

    completedBookList.innerHTML =
      completedBooks.join('') || createEmptyBookTemplate();

    inCompletedBookList.innerHTML =
      inCompletedBooks.join('') || createEmptyBookTemplate();
  }

  addNewBook(event) {
    event.preventDefault();

    const payload = this._parseForm(event.target);
    const newBook = new BookModel(payload);
    this._repository.addBook(newBook);

    document.dispatchEvent(new Event(this._event));
  }
}
