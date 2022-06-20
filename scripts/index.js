const RENDER_BOOKS_EVENT = 'render-books';
const BOOKS_STORAGE_KEY = 'books';

// do rerender when state change with observer
const bookRenderEvent = () => {
  document.dispatchEvent(new Event(RENDER_BOOKS_EVENT));
};

const observer = new Observer();
observer.attach(bookRenderEvent);

const initialState = { books: [] };
const state = new Reactive(initialState, observer);
const bookStorage = new LocalStorage({ key: BOOKS_STORAGE_KEY });

const addBookFormElement = document.getElementById('form:book');
const searchBookFormElement = document.getElementById('form:search');

const dialogElement = document.getElementById('dialog:alert');
const acceptButton = document.getElementById('dialog:alert:accept');
const declineButton = document.getElementById('dialog:alert:decline');

// delete book when user accept from alert dialog
acceptButton.addEventListener('click', (event) => {
  const id = event.target.value;
  const oldBooks = state.data.books;
  const newBooks = oldBooks
    .filter((book) => book.id !== Number(id))
    .map((book) => new Book(book));

  console.log({ oldBooks, newBooks });

  bookStorage.insert(newBooks);
  state.data.books = newBooks;

  dialogElement.close();
});

declineButton.addEventListener('click', () => {
  dialogElement.close();
});

// event listener for delete book
const handleDeleteBook = (event) => {
  acceptButton.setAttribute('value', event.target.value);
  dialogElement.show();
};

// event listener for toggle book status
const handleChangeBookStatus = (event) => {
  const id = event.target.value;

  const oldBooks = state.data.books;
  const newBooks = oldBooks.map((book) => {
    if (book.id === Number(id)) {
      return new Book({ ...book, isComplete: !book.isComplete });
    }
    return new Book(book);
  });

  bookStorage.insert(newBooks);
  state.data.books = newBooks;
};

// load books from storage
document.addEventListener('DOMContentLoaded', () => {
  state.data.books = bookStorage.select();
});

// add new book
addBookFormElement.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const payload = {};

  for (const key of formData.keys()) {
    payload[key] = formData.get(key);
  }

  const id = +new Date();
  const newBook = new Book({ id, ...payload });

  state.data.books = [...state.data.books, newBook];
  bookStorage.insert(state.data.books);

  event.target.reset();
});

// search book
searchBookFormElement.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const term = formData.get('term');

  const oldBooks = state.data.books;

  const newBooks = oldBooks.map((book) => {
    const filterKeys = ['title', 'author', 'year'];

    const isMatch = filterKeys.some((key) => {
      console.log({ key, target: book[key] });
      const target = book[key].toString().toLowerCase();
      return target.includes(term.toLowerCase());
    });

    if (isMatch) return { ...book, isHide: false };
    return { ...book, isHide: true };
  });

  state.data.books = newBooks;
});

// render books to DOM
document.addEventListener(RENDER_BOOKS_EVENT, () => {
  const incompleteListElement = document.getElementById('book-list:incomplete');
  const completeListElement = document.getElementById('book-list:complete');

  incompleteListElement.innerHTML = '';
  completeListElement.innerHTML = '';

  for (const book of state.data.books) {
    if (book.isHide) continue;

    const bookElement = createBookTemplate(book, {
      onDelete: handleDeleteBook,
      onChange: handleChangeBookStatus,
    });

    if (book.isComplete) completeListElement.appendChild(bookElement);
    else incompleteListElement.appendChild(bookElement);
  }

  if (!completeListElement.children.length) {
    completeListElement.appendChild(createEmptyBookTemplate());
  }

  if (!incompleteListElement.children.length) {
    incompleteListElement.appendChild(createEmptyBookTemplate());
  }
});
