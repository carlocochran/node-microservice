import { Name } from "./Name";

export class Book{
    isbn : string;
    name : string;
    price : number;
    author : Name[];
    
    constructor(isbn: string, name: string, price: number, author: Name[]){
        this.isbn = isbn;
        this.name = name;
        this.price = price;
        this.author = author;
    }

}