const express = require('express');
const Router = express.Router();

const books = [
     {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        year: 1925
        },
    {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        year: 1960
    },
    {
        id: 3,
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        year: 1950
    }
];

router.get('/books', (req, res) => {
    res.json(books);
});

router.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({"error":'Book not found'});
    }
});

router.post('/books', (req, res) => {
    const newBook = req.body;
    if (!newBook.title || !newBook.author || !newBook.year) {
        return res.status(400).json({"error": "Title, author, and year are required fields."});
    }
    //the new book passes the validation, so we can add it to the books array
    newBook.id =
Math.max(...books.map(b => b.id)) + 1;
     books.push(newBook);
    res.status(201).json(newBook);
    
});

router.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex !== -1) {
        const updatedBook = req.body;
        if (!updatedBook.title || !updatedBook.author || !updatedBook.year) {
            return res.status(400).json({"error": "Title, author, and year are required fields."});
        }
    }
    updatedBook.id = bookId;
    books[bookIndex] = updatedBook;
    res.status(200).json(updatedBook);
});
        

router.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.status(200).json('Book deleted successfully');
    } else {
        res.status(404).json({'error':'Book not found'});
    }
});

module.exports = router;