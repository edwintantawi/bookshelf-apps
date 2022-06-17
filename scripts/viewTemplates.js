function createBookTemplate({ title, author, year, isComplete }) {
  return `
      <li>
        <article class="border border-1 px-5 py-3 rounded-md hover:border-blue-400 mb-2 text-gray-600">
          <h3 class="text-xl font-bold">${title}</h3>
          <address>Author: ${author}</address>
          <p>Year: <time datetime="${year}">${year}</time></p>
        </article>
      </li>
    `;
}

function createEmptyBookTemplate() {
  return `
      <li class="flex flex-1">
        <article class="border border-dashed border-2 px-5 py-3 rounded-md mb-2 text-center text-gray-400 flex flex-col flex-1 justify-center ">
          <h3 class="text-lg font-bold">Oops its empty</h3>
          <p>Try adding a list of books to appear here</p>
        </article>
      </li>
    `;
}
