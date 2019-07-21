import { Book } from "../model/Book";
import { Database } from "./db/Database";

export class BookService{
    public createBook = (book: Book): Promise<boolean> => {
        let db = new Database();
        return db.addBook(book);
    }

    public getBook = async(id: string): Promise<Book> =>{
        let db = new Database();
        return db.getBook(id);
    }

    public deleteBook = async(id: string): Promise<boolean> => {
        let db = new Database();
        return db.deleteBook(id);
    }

    public updateBook = (id: string, book: Book): Promise<boolean> => {
        let db = new Database();
        return db.updateBook(id, book);
    }
}