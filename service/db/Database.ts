import { MongoClient, MongoError, Db, ObjectId } from 'mongodb';
import { Book } from '../../model/Book';

export class Database{
    private _client : MongoClient|null = null;
    private _url = "mongodb://localhost:27017/";
    private _db = "mydb";
    private _collection = "books";

    private createConnection = async() : Promise<Db> => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this._url).then((db) => {
                this._client = db;               
                let dbo = db.db(this._db);
                resolve(dbo);
            }, (err) => {
                reject(err);
            });
        });
    }

    public addBook = async(book: Book): Promise<boolean> => {
        let connection = await this.createConnection();
        return new Promise((resolve, reject) => {
            connection.collection(this._collection).insertOne(book).then((result) => {
                console.log("1 document inserted: "+JSON.stringify(book));
                resolve(true);
            }).catch((error) => {
                reject(error)
            }).finally(() =>{
                if (this._client != null){
                    this._client.close();
                }               
            })
        });
    }

    public getBook = async(id: string): Promise<Book> => {
        let connection = await this.createConnection();
        return new Promise((resolve, reject) => {
            try{
                connection.collection(this._collection).findOne({_id : new ObjectId(id)}, (err, result) =>{               
                    if (err){
                        reject(err);
                    }
                    resolve(result);
                });
            }
            finally{
                if (this._client != null){
                    this._client.close();
                } 
            }
        });
    }

    public deleteBook = async(id: string): Promise<boolean> => {
        let connection = await this.createConnection();        
        return new Promise((resolve, reject) => {
            try{
                connection.collection(this._collection).deleteOne({_id: new ObjectId(id)}, (err, result) => {
                    if (err){
                        reject(err);
                    }
                    if (result.deletedCount == 0){
                        resolve(false);
                    }
                    else{
                        resolve(true);
                    }
                });
            }
            finally{
                if (this._client != null){
                    this._client.close();
                } 
            }
        });
    }

    public updateBook = async (id: string, book: Book): Promise<boolean> => {
        let connection = await this.createConnection();
        return new Promise((resolve, reject) => {
            try{
                connection.collection(this._collection).updateOne({_id: new ObjectId(id)}, {$set: book}, (err, result)=> {
                    if (result.matchedCount === 1 && result.modifiedCount === 1){
                        resolve(true);
                    }
                    else{
                        resolve(false);
                    }
                });
            }
            finally{
                if (this._client != null){
                    this._client.close();
                }                
            }
        });
    }
}
