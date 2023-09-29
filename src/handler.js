/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable padded-blocks */
/* eslint-disable object-curly-newline */

const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload;
    
    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal tambah buku. Isi nama buku',
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal tambah buku. readPage tidak boleh lebih besar dari PageCount',
        });
        response.code(400);
        return response;
    }

    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        id,
        finished,
        insertedAt,
        updatedAt,
    };

    books.push(newBook);

    const isSuccess = books.filter((note) => note.id === id).length > 0;
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;

};

const getAllBooksHandler = (request, h) => {
    const { name, reading, finished } = request.query;
    let filteredBooks = books;

    if (name) {
        const lowerCaseName = name.toLowerCase();
        filteredBooks = filteredBooks.filter((book) => 
            book.name.toLowerCase().includes(lowerCaseName)
        );
    }

    if (reading !== undefined) {
        filteredBooks = filteredBooks.filter(
            (book) => Number(book.reading) === Number(reading)
        );
    }

    if (finished !== undefined) {
        filteredBooks = filteredBooks.filter(
            (book) => Number(book.finished) === Number(finished)
        );
    }

    const response = h.response({
        status: 'success',
        data: {
            books: filteredBooks.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    });
    response.code(200);
    return response;
};

const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const book = books.filter((n) => n.id === bookId)[0];

    if (book) {
        const response = h.response({
            status: 'success',
            data: {
                book,
            },
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Isi nama buku',
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari PageCount',
        });
        response.code(400);
        return response;
    }

    const finished = pageCount === readPage;
    const updatedAt = new Date().toISOString();

    const index = books.findIndex((note) => note.id === bookId);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            finished,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ada',
    });
    response.code(404);
    return response;
};

const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const index = books.findIndex((note) => note.id === bookId);

    if (index !== -1) {
        books.splice(index, 1);

        const response = h.response({
            status: 'success',
            message: 'Buku anda berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku anda gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

// eslint-disable-next-line eol-last
module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler };