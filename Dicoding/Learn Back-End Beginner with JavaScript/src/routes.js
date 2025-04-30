const {
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookByIdHandler,
  } = require('./handler');
  
  const routes = (request, response) => {
    const { method, url } = request;
  
    if (method === 'POST' && url === '/books') return addBookHandler(request, response);
    if (method === 'GET' && url.startsWith('/books/')) return getBookByIdHandler(request, response, url.split('/')[2]);
    if (method === 'GET' && url.startsWith('/books')) return getAllBooksHandler(request, response);
    if (method === 'PUT' && url.startsWith('/books/')) return editBookByIdHandler(request, response, url.split('/')[2]);
    if (method === 'DELETE' && url.startsWith('/books/')) return deleteBookByIdHandler(request, response, url.split('/')[2]);
  
    response.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({
      status: 'fail',
      message: 'Halaman tidak ditemukan',
    }));
  };
  
  module.exports = routes;  