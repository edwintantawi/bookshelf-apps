const RENDER_BOOKS_EVENT = 'render-books';
const BOOKS_STORAGE_KEY = 'books';

const bookRenderEvent = () => {
  document.dispatchEvent(new Event(RENDER_BOOKS_EVENT));
};

const observer = new Observer();
observer.attach(bookRenderEvent);

const initialState = { books: [] };
const state = new Reactive(initialState, observer);
const bookStorage = new LocalStorage({ key: BOOKS_STORAGE_KEY });

const addBookFormElement = document.getElementById('form:book');
const deleteDialogElement = document.getElementById('dialog:delete-alert');

// event listener for delete book
const handleDeleteBook = (event) => {
  const id = event.target.value;

  deleteDialogElement.setAttribute('open', 'true');

  const declineButton = deleteDialogElement.querySelector('#decline');
  const acceptButton = deleteDialogElement.querySelector('#accept');

  declineButton.addEventListener('click', () =>
    deleteDialogElement.removeAttribute('open')
  );

  acceptButton.addEventListener('click', () => {
    const oldBooks = state.data.books;
    const newBooks = oldBooks.filter((book) => book.id !== Number(id));

    bookStorage.insert(newBooks);
    state.data.books = newBooks;

    deleteDialogElement.removeAttribute('open');
  });
};

// event listener for toggle book status
const handleChangeBookStatus = (event) => {
  const id = event.target.value;

  const oldBooks = state.data.books;
  const newBooks = oldBooks.map((book) => {
    if (book.id === Number(id)) {
      return { ...book, isComplete: !book.isComplete };
    }
    return book;
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
});

// render books to DOM
document.addEventListener(RENDER_BOOKS_EVENT, () => {
  const incompleteListElement = document.getElementById('book-list:incomplete');
  const completeListElement = document.getElementById('book-list:complete');

  incompleteListElement.innerHTML = '';
  completeListElement.innerHTML = '';

  for (const book of state.data.books) {
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
