/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable object-curly-newline */

const { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler } = require("./handler");

const routes = [
    {
        method: "POST",
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: "GET",
        path: '/books',
        handler: getAllBooksHandler,
    },
    {
        method: "GET",
        path: '/books/{bookId}',
        handler: getBookByIdHandler,
    },
    {
        method: "PUT",
        path: '/books/{bookId}',
        handler: editBookByIdHandler,
    },
    {
        method: "DELETE",
        path: '/books/{bookId}',
        handler: deleteBookByIdHandler,
    },
];

// eslint-disable-next-line eol-last
module.exports = routes;