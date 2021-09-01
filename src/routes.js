const {
    addBooks, getAllBooks, getBookDetail, updateBook, deleteBook,
} = require('./handler');

const routes = [
    {
        method: '*',
        path: '/',
        handler: (request, h) => 'Homepage',
    },
    {
        method: 'POST',
        path: '/books',
        handler: addBooks,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooks,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookDetail,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBook,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBook,
    },
];

module.exports = routes;
