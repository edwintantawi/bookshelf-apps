const createBookTemplate = (
  { id, title, author, year, isComplete },
  { onDelete, onChange, onEdit }
) => {
  const buttonBaseClass = [
    'text-white',
    'py-1',
    'px-3',
    'rounded-md',
    'font-bold',
    'text-sm',
    'lg:text-base',
  ];

  const list = document.createElement('li');

  const article = document.createElement('article');
  article.classList.add(
    'border',
    'border-1',
    'p-4',
    'md:px-5',
    'md:py-3',
    'rounded-md',
    'hover:border-gray-400/60',
    'text-gray-600'
  );

  const articleHeading = document.createElement('h3');
  articleHeading.classList.add('text-xl', 'font-bold', 'mb-1');
  articleHeading.innerText = title;

  const authorTitle = document.createElement('span');
  authorTitle.classList.add('text-gray-400', 'italic');
  authorTitle.innerText = 'Author: ';

  const articleAuthor = document.createElement('address');
  articleAuthor.classList.add('text-sm', 'md:text-base');
  articleAuthor.append(authorTitle, author);

  const timeTitle = document.createElement('span');
  timeTitle.classList.add('text-gray-400', 'italic');
  timeTitle.innerText = 'Year: ';

  const articleYear = document.createElement('time');
  articleYear.classList.add('text-sm', 'md:text-base');
  articleYear.setAttribute('datetime', year);
  articleYear.append(timeTitle, year);

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
  deleteButton.setAttribute('value', id);
  deleteButton.addEventListener('click', onDelete);

  const changeStatusButton = document.createElement('button');
  changeStatusButton.setAttribute('value', id);
  changeStatusButton.addEventListener('click', onChange);

  if (isComplete) {
    changeStatusButton.classList.add(
      ...buttonBaseClass,
      'bg-orange-600',
      'hover:bg-orange-600/75'
    );
    changeStatusButton.innerText = 'In Complete';
  } else {
    changeStatusButton.classList.add(
      ...buttonBaseClass,
      'bg-green-600',
      'hover:bg-green-600/75'
    );
    changeStatusButton.innerText = 'Complete';
  }

  const editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.classList.add(
    ...buttonBaseClass,
    'bg-purple-600',
    'hover:bg-purple-600/75'
  );
  editButton.setAttribute('value', id);
  editButton.addEventListener('click', onEdit);

  footer.append(changeStatusButton, editButton, deleteButton);
  article.append(articleHeading, articleAuthor, articleYear, footer);
  list.appendChild(article);
  return list;
};

const createEmptyBookTemplate = () => {
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
};
