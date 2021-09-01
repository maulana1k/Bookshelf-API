const { nanoid } = require('nanoid');
const books = require('./books');

const addBooks = (request, h) => {
    const {
        name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;

    const id = nanoid(16);
    const finished = readPage === pageCount;
    const insertedAt = new Date().toISOString();
    const upadatedAt = insertedAt;

    const newBook = {
        id, name, year, summary, author, publisher, pageCount, readPage, reading, finished, insertedAt, upadatedAt,
    };
    let res;
    if (!name) {
  	res = h.response({
  		status: 'fail',
  		message: 'Gagal menambahkan buku. Mohon isi nama buku',
  	});
  	res.code(400);
  	return res;
    }
    if (readPage > pageCount) {
  	res = h.response({
  		status: 'fail',
  		message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
  	});
  	res.code(400);
  	return res;
    }
  	books.push(newBook);
  	console.log(books);
  	const isSuccess = books.findIndex((item) => item.id === id);
  	console.log(isSuccess);
  	if (isSuccess === -1) {
  		res = h.response({
  			status: '500',
  			message: 'Buku gagal ditambahkan',
  		});
  		res.code(500);
  		return res;
  	}
  	res = h.response({
  		status: 'success',
  		message: 'Buku berhasil ditambahkan',
  		data: {
  			bookId: id,
  		},
  	});
  	res.code(201);
  	return res;
};

const getAllBooks = (request, h) => {
    console.log('allbooks\n', books);
    const { name, reading, finished } = request.query;
    const isEmpty = books.length === 0;
    const allBooks = books.filter((item) => {
    	if (name) { return item.name.toLowerCase().includes(name.toLowerCase()); }
    	if (reading) { return item.reading == reading; }
    	if (finished) { return item.finished == finished; }
    	return item;
    }).map((item) => ({
        id: item.id,
        name: item.name,
        publisher: item.publisher,
    }));
    // if (name) {
    // 	name = name.toLowerCase();
    // 	console.log('name', name);
    // 	filterBook = allBooks.filter((item) => item.name.toLowerCase().includes(name));
    // 	allbooks = filterBook.map(item=>{
    // 		return{

    // 		id: item.id,
    //     name: item.name,
    //     publisher: item.publisher,
    // 		}
    // 	})
    // }
    // if (reading!=null) {
    // 	console.log('read',reading)
    // 	filterBook = books.filter((item) => {return item.reading == reading});
    // 	console.log(filterBook)
    // 	allbooks = filterBook.map(item=>({
    // 		id: item.id,
    //     name: item.name,
    //     publisher: item.publisher,
    // 	}))
    // }
    // if (finished!=undefined) {
    // 	console.log('fn',finished)
    // 	filterBook = allBooks.filter((item) => {return item.finished == finished});
    // 	allbooks = filterBook.map(item=>({
    // 		id: item.id,
    //     name: item.name,
    //     publisher: item.publisher,
    // 	}))
    // }
    const res = h.response({
        status: 'success',
        data: {
            books: allBooks,
        },
    });
    res.code(200);
    return res;
};

const getBookDetail = (request, h) => {
    const { bookId } = request.params;
    const bookDetail = books.filter((item) => item.id === bookId);
    let res;
    if (bookDetail.length === 0) {
        res = h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        });
        res.code(404);
        return res;
    }
    res = h.response({
        status: 'success',
        data: {
            book: bookDetail,
        },
    });
    res.code(200);
    return res;
};

const updateBook = (request, h) => {
    const {
        name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;
    const { bookId } = request.params;
    const bookIndex = books.findIndex((item) => item.id === bookId);

    let res;
    if (!name) {
        res = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        res.code(400);
        return res;
    }
    if (readPage > pageCount) {
        res = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        res.code(400);
        return res;
    }
    if (bookIndex === -1) {
        res = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
        res.code(404);
        return res;
    }
    const updatedAt = new Date().toISOString();
    books[bookIndex] = {
        ...books[bookIndex],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt,
    };
    res = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
    });
    res.code(200);
    return res;
};

const deleteBook = (request, h) => {
    const { bookId } = request.params;
    const bookIndex = books.findIndex((item) => item.id === bookId);
    let res;
    if (bookIndex === -1) {
        res = h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        });
        res.code(404);
        return res;
    }
    books.splice(bookIndex, 1);
    res = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
    });
    res.code(200);
    return res;
};

module.exports = {
    addBooks, getAllBooks, getBookDetail, updateBook, deleteBook,
};
