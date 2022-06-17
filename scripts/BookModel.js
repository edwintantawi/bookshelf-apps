class BookModel {
  constructor({ title, author, year, isComplete = false }) {
    this.title = title;
    this.author = author;
    this.year = Number(year);
    this.isComplete = Boolean(isComplete);
  }
}
