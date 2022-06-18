function createBookTemplate({ id, title, author, year, isComplete }) {
  const buttonBaseClass = [
    'text-white',
    'py-1',
    'px-3',
    'rounded-md',
    'font-bold',
  ];

  const handleDeleteBook = () => {
    document.dispatchEvent(
      new CustomEvent(DELETE_BOOK_EVENT, { detail: { id } })
    );
  };

  const handleCompleteBook = () => {
    document.dispatchEvent(
      new CustomEvent(PUT_COMPLETE_BOOK_EVENT, {
        detail: { id, isComplete: true },
      })
    );
  };

  const handleInCompleteBook = () => {
    document.dispatchEvent(
      new CustomEvent(PUT_COMPLETE_BOOK_EVENT, {
        detail: { id, isComplete: false },
      })
    );
  };

  const list = document.createElement('li');

  const article = document.createElement('article');
  article.classList.add(
    'border',
    'border-1',
    'px-5',
    'py-3',
    'rounded-md',
    'hover:border-blue-400',
    'mb-2',
    'text-gray-600'
  );

  const articleHeading = document.createElement('h3');
  articleHeading.classList.add('text-xl', 'font-bold');
  articleHeading.innerText = title;

  const articleAuthor = document.createElement('address');
  articleAuthor.innerText = author;

  const articleTime = document.createElement('time');
  articleTime.innerText = year;
  articleTime.setAttribute('datetime', year);

  const footer = document.createElement('footer');
  footer.classList.add(
    'flex',
    'justify-end',
    'border-t',
    'pt-3',
    'mt-2',
    'gap-2'
  );

  const deleteButton = document.createElement('button');
  deleteButton.classList.add(
    ...buttonBaseClass,
    'bg-red-600',
    'hover:bg-red-600/75'
  );
  deleteButton.innerText = 'Delete';
  // deleteButton.setAttribute('value', id);
  deleteButton.addEventListener('click', handleDeleteBook);

  const completeButton = document.createElement('button');
  completeButton.classList.add(
    ...buttonBaseClass,
    'bg-green-600',
    'hover:bg-green-600/75'
  );
  completeButton.innerText = 'Complete';
  // completeButton.setAttribute('value', id);
  completeButton.addEventListener('click', handleCompleteBook);

  const inCompleteButton = document.createElement('button');
  inCompleteButton.classList.add(
    ...buttonBaseClass,
    'bg-orange-600',
    'hover:bg-orange-600/75'
  );
  inCompleteButton.innerText = 'In Complete';
  // inCompleteButton.setAttribute('value', id);
  inCompleteButton.addEventListener('click', handleInCompleteBook);

  footer.append(deleteButton, isComplete ? inCompleteButton : completeButton);
  article.append(articleHeading, articleAuthor, articleTime, footer);
  list.appendChild(article);
  return list;
}

function createEmptyBookTemplate() {
  const list = document.createElement('li');
  list.classList.add('flex', 'flex-1');

  const article = document.createElement('article');
  article.classList.add(
    'border',
    'border-dashed',
    'border-2',
    'px-5',
    'py-3',
    'rounded-md',
    'mb-2',
    'text-center',
    'text-gray-400',
    'flex',
    'flex-col',
    'flex-1',
    'justify-center'
  );

  const articleHeading = document.createElement('h3');
  articleHeading.classList.add('text-lg', 'font-bold');
  articleHeading.innerText = 'Oops its empty';

  const paragraph = document.createElement('p');
  paragraph.innerText = 'Try adding a list of books to appear here';

  article.append(articleHeading, paragraph);
  list.append(article);

  return list;
}
