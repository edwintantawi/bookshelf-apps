class BookController {
  constructor({ repository }) {
    this._repository = repository;

    this.getAllBooks = this.getAllBooks.bind(this);
    this.addNewBook = this.addNewBook.bind(this);
    this.deleteBookById = this.deleteBookById.bind(this);
    this.putBookById = this.putBookById.bind(this);
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

    completedBookList.innerHTML = '';
    inCompletedBookList.innerHTML = '';

    completedBookList.append(...completedBooks);
    inCompletedBookList.append(...inCompletedBooks);

    if (!completedBooks.length)
      completedBookList.append(createEmptyBookTemplate());
    if (!inCompletedBooks.length)
      inCompletedBookList.append(createEmptyBookTemplate());
  }

  addNewBook(event) {
    event.preventDefault();

    const payload = this._parseForm(event.target);
    const newBook = new BookModel(payload);
    this._repository.addBook(newBook);

    document.dispatchEvent(new Event(GET_BOOK_EVENT));
  }

  deleteBookById(event) {
    const { id } = event.detail;
    const oldBooks = this._repository.getBooks();
    const newBooks = oldBooks.filter((book) => book.id !== id);
    this._repository.deleteOrUpdateBook(newBooks);
    document.dispatchEvent(new Event(GET_BOOK_EVENT));
  }

  putBookById(event) {
    const { id, title, author, year, isComplete } = event.detail;
    const oldBooks = this._repository.getBooks();
    const newBooks = oldBooks.map((book) => {
      if (book.id === id) {
        return {
          ...book,
          ...new BookModel({
            title: title ?? book.title,
            author: author ?? book.author,
            year: year ?? book.year,
            isComplete: isComplete ?? book.isComplete,
          }),
        };
      }

      return book;
    });

    this._repository.deleteOrUpdateBook(newBooks);
    document.dispatchEvent(new Event(GET_BOOK_EVENT));
  }
}
