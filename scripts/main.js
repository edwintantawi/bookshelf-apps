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

const deleteDialogElement = document.getElementById('dialog:delete');
const formDelete = document.getElementById('form:delete');

const editDialogElement = document.getElementById('dialog:edit');
const formEdit = document.getElementById('form:edit');

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
      const target = book[key].toString().toLowerCase();
      return target.includes(term.toLowerCase());
    });

    if (isMatch) return { ...book, isHide: false };
    return { ...book, isHide: true };
  });

  state.data.books = newBooks;
});

// event listener for reset edit form
formEdit.addEventListener('reset', () => {
  editDialogElement.close();
});

// event listener for submit edit form
formEdit.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const payload = {};

  for (const key of formData.keys()) {
    payload[key] = formData.get(key);
  }

  state.data.books = state.data.books.map((book) => {
    if (book.id === payload.id) return new Book(payload);
    return book;
  });

  bookStorage.insert(state.data.books);

  event.target.reset();

  editDialogElement.close();
});

// event listener for submit delete form
formDelete.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const id = formData.get('id');

  const oldBooks = state.data.books;
  const newBooks = oldBooks
    .filter((book) => book.id !== id)
    .map((book) => new Book(book));
  
  bookStorage.insert(newBooks);
  state.data.books = newBooks;

  deleteDialogElement.close();
});

// event listener for reset delete form
formDelete.addEventListener('reset', () => {
  deleteDialogElement.close();
});

// event listener for delete book to open alert dialog
const handleDeleteBook = (event) => {
  const id = event.target.value;

  formDelete.querySelector('[name="id"]').value = id;
  deleteDialogElement.show();
};

// event listener for toggle book status
const handleChangeBookStatus = (event) => {
  const id = event.target.value;

  const oldBooks = state.data.books;
  const newBooks = oldBooks.map((book) => {
    if (book.id === id) {
      return new Book({ ...book, isComplete: !book.isComplete });
    }
    return new Book(book);
  });

  bookStorage.insert(newBooks);
  state.data.books = newBooks;
};

//event listener for edit book
const handleEditBook = (event) => {
  const id = event.target.value;

  const book = state.data.books.find((book) => book.id === id);

  if (!book) return;

  formEdit.querySelector('[name="id"]').value = book.id;
  formEdit.querySelector('[name="title"]').value = book.title;
  formEdit.querySelector('[name="author"]').value = book.author;
  formEdit.querySelector('[name="year"]').value = book.year;
  formEdit.querySelector('[name="isComplete"]').checked = book.isComplete;

  editDialogElement.show();
};

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
      onEdit: handleEditBook,
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
