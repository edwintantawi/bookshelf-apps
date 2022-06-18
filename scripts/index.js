const GET_BOOK_EVENT = 'render-app';
const DELETE_BOOK_EVENT = 'delete-book';
const PUT_COMPLETE_BOOK_EVENT = 'toggle-complete-book';

const idGenerator = () => +new Date();
const storage = new LocalStorage();
const repository = new BookRepository({ storage, idGenerator });
const controller = new BookController({ repository });

const addBookForm = document.getElementById('form:book');

document.addEventListener('DOMContentLoaded', controller.getAllBooks);
document.addEventListener(GET_BOOK_EVENT, controller.getAllBooks);
document.addEventListener(DELETE_BOOK_EVENT, controller.deleteBookById);
document.addEventListener(PUT_COMPLETE_BOOK_EVENT, controller.putBookById);

addBookForm.addEventListener('submit', controller.addNewBook);
