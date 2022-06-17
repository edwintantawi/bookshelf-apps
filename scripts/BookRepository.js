class BookRepository {
  constructor({ storage, idGenerator }) {
    this._storage = storage;
    this._idGenerator = idGenerator;
    this._key = 'books';
  }

  getBooks() {
    return this._storage.select(this._key) || [];
  }

  addBook(newBook) {
    const id = this._idGenerator();
    const books = this.getBooks();
    books.push({ id, ...newBook });
    this._storage.insert(this._key, books);
  }
}
