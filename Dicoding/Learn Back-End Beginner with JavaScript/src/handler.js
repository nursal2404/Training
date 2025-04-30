const { nanoid } = require('nanoid');
const books = require('./books');
const { sendResponse } = require('./utils/response');
const { parseRequestURL } = require('./utils/parseURL');

const addBookHandler = (request, response) => {
  let body = '';
  request.on('data', chunk => { body += chunk; });
  request.on('end', () => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = JSON.parse(body);

    if (!name) {
      return sendResponse(response, 400, {
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });
    }

    if (readPage > pageCount) {
      return sendResponse(response, 400, {
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
      id, name, year, author, summary, publisher,
      pageCount, readPage, finished, reading, insertedAt, updatedAt
    };

    books.push(newBook);

    return sendResponse(response, 201, {
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: { bookId: id }
    });
  });
};

const getAllBooksHandler = (request, response) => {
  const url = parseRequestURL(request);
  const name = url.searchParams.get('name');
  const reading = url.searchParams.get('reading');
  const finished = url.searchParams.get('finished');

  let filteredBooks = books;

  if (name !== null) {
    filteredBooks = filteredBooks.filter((b) => b.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading !== null) {
    filteredBooks = filteredBooks.filter((b) => b.reading === (reading === '1'));
  }

  if (finished !== null) {
    filteredBooks = filteredBooks.filter((b) => b.finished === (finished === '1'));
  }

  const bookList = filteredBooks.map(({ id, name, publisher }) => ({ id, name, publisher }));

  return sendResponse(response, 200, {
    status: 'success',
    data: { books: bookList }
  });
};

const getBookByIdHandler = (request, response, id) => {
  const book = books.find((b) => b.id === id);

  if (!book) {
    return sendResponse(response, 404, {
      status: 'fail',
      message: 'Buku tidak ditemukan'
    });
  }

  return sendResponse(response, 200, {
    status: 'success',
    data: { book }
  });
};

const editBookByIdHandler = (request, response, id) => {
  let body = '';
  request.on('data', chunk => { body += chunk; });
  request.on('end', () => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = JSON.parse(body);

    if (!name) {
      return sendResponse(response, 400, {
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
    }

    if (readPage > pageCount) {
      return sendResponse(response, 400, {
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
    }

    const index = books.findIndex((b) => b.id === id);

    if (index === -1) {
      return sendResponse(response, 404, {
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      });
    }

    books[index] = {
      ...books[index],
      name, year, author, summary, publisher,
      pageCount, readPage, reading,
      finished: pageCount === readPage,
      updatedAt: new Date().toISOString(),
    };

    return sendResponse(response, 200, {
      status: 'success',
      message: 'Buku berhasil diperbarui'
    });
  });
};

const deleteBookByIdHandler = (request, response, id) => {
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return sendResponse(response, 404, {
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
  }

  books.splice(index, 1);

  return sendResponse(response, 200, {
    status: 'success',
    message: 'Buku berhasil dihapus'
  });
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};