class Book {
  constructor({ id, title, author, year, isComplete = false }) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = Number(year);
    this.isComplete = Boolean(isComplete);
  }
}
