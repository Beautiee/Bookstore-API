const express = require('express');
const app = express();


app.use(express.json());

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

app.get('/', (req, res) => {
    res.send('Welcome to the Bookstore API');
});

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

app.post('/books', (req, res) => {
    const newBook = req.body;
    if (!newBook.title || !newBook.author || !newBook.year) {
        return res.status(400).send('"error": "Title, author, and year are required fields."');
    }
    //the new book passes the validation, so we can add it to the books array
    newBook.id =
    Math.max(...books.map(b => b.id)) + 1;
     books.push(newBook);
    res.status(201).json(newBook);
    
});

app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.status(200).send('Book deleted successfully');
    } else {
        res.status(404).send('Book not found');
    }
});


app.listen(3001, () => {
    console.log('Running on port 3001');
});