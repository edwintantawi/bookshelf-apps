const RENDER_BOOK_EVENT = 'render-app';

const idGenerator = () => +new Date();
const storage = new LocalStorage();
const repository = new BookRepository({ storage, idGenerator });
const controller = new BookController({ repository, event: RENDER_BOOK_EVENT });

const addBookForm = document.getElementById('form:book');

document.addEventListener('DOMContentLoaded', controller.getAllBooks);
document.addEventListener(RENDER_BOOK_EVENT, controller.getAllBooks);
addBookForm.addEventListener('submit', controller.addNewBook);
