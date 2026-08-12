const express = require('express');
const booksRouter = require('./routes/book');
const app = express();

app.use(express.json());
app.use('/', booksRouter);


app.get('/', (req, res) => {
    res.send('Welcome to the Bookstore API');
});


app.listen(3001, () => {console.log('Running on port 3001');
});