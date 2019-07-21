import express = require("express");
import { BookService } from './service/BookService';
import { Book } from './model/Book';
import { Status, StatusCode } from './model/Status';


let app = express();
app.use(express.json());

app.post('/book', (req, res) => {
    let book: Book;
    book = req.body;
    let bookService = new BookService();
    bookService.createBook(book).then((successful: boolean) => {
        if (successful){
            res.send(new Status(StatusCode.SUCCESSFUL, '').toString());
        }
        else{
            res.status(500).send(new Status(StatusCode.ERROR, `Unable to create new book`).toString());
        }
    }).catch((error)=> {
        res.status(500).send(new Status(StatusCode.ERROR, error).toString());
    })
});

app.get('/book/:id', (req, res) => {
    const id = req.params.id;
    let bookService = new BookService();
    bookService.getBook(id).then((book: Book) => {
         res.send(book);
     }).catch((error) => {
        res.status(500).send(new Status(StatusCode.ERROR, error).toString());
    })    
});

app.put('/book/:id', (req, res) => {
    const id = req.params.id;
    const book = req.body;
    const bookService = new BookService();
    bookService.updateBook(id, book).then((successful) => {
        if (successful){
            res.send(new Status(StatusCode.SUCCESSFUL, '').toString());
        }
        else{
            res.status(500).send(new Status(StatusCode.ERROR, `Unable to update book ${id}`).toString());
        }
    }).catch((error) => {
        res.status(500).send(new Status(StatusCode.ERROR, error).toString());
    });
});

app.delete('/book/:id', (req, res) => {
    const id = req.params.id;
    let bookService = new BookService();
    bookService.deleteBook(id).then((successful : boolean) => {
        if (successful){
            res.send(new Status(StatusCode.SUCCESSFUL, '').toString());
        }
        else{
            res.status(500).send(new Status(StatusCode.ERROR, `Unable to delete book ${id}`).toString());
        }
    }).catch((error) => {
        res.status(500).send(new Status(StatusCode.ERROR, error).toString());
    })
});

app.listen(3001);
console.log('Listening on port 3001...');