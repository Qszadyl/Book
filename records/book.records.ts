import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";
import { v4 as uuid } from 'uuid';
import { FieldPacket } from "mysql2";
import { BookEntity } from "../types";


type BookRecordResult = [BookRecord[], FieldPacket[]];

export class BookRecord implements BookEntity{
    id?: string;
    title: string;
    name: string;
    surname: string;
    release: string;
    category: string;

    constructor(obj: BookEntity){
        if(!obj.title || obj.title.length < 3 || obj.title.length > 100 ){
            throw new ValidationError('Nazwa prezentu musi mieć od 3 do 100 znaków')
        }

        if(!obj.title){
            throw new ValidationError('Musi być wybrana kategoria')
        }


        this.id = obj.id;
        this.title = obj.title;
        this.name = obj.name;
        this.surname = obj.surname;
        this.release= obj.release;
        this.category = obj.category;
    }

    async insert():Promise<string>{
        if(!this.id){
            this.id = uuid();
        }
        await pool.execute("INSERT INTO `books` VALUES(:id,:title,:name,:surname,:release,:category)",{
            id: this.id,
            title: this.title,
            name: this.name,
            surname: this.surname,
            release: this.release,
            category:this.category
        })
        return this.id;
    }

    static async bookAll():Promise<BookRecord[]>{
        const [results] = await pool.execute("SELECT * FROM `books`") as BookRecordResult;
        return results.map(obj=>new BookRecord(obj))
    }


    static async getOne(id:string):Promise<BookRecord | null>{
        const [results] = await pool.execute("SELECT * FROM `books` WHERE `id`= :id",{
            id
        }) as BookRecordResult;
        return results.length === 0 ? null : new BookRecord(results[0]);
    }

    static async searchBookByTitle(titleBook:string):Promise<BookRecord[] | null>{
        const [results] = await pool.execute(`SELECT * FROM books WHERE title LIKE '%${titleBook}%'`,{
            titleBook
        }) as BookRecordResult;
        return results.map(obj=>new BookRecord(obj))
    }

    static async searchBookByAuthorName(nameOfAuthor:string):Promise<BookRecord[]>{
        const [results] = await pool.execute(`SELECT * FROM books WHERE name LIKE '${nameOfAuthor}%'`,{
            nameOfAuthor
        }) as BookRecordResult;
        return results.map(obj=>new BookRecord(obj))
    }

    static async searchBookByCategory(bookCategory:string):Promise<BookRecord[]>{
        const [results] = await pool.execute(`SELECT * FROM books WHERE name LIKE '${bookCategory}'`,{
            bookCategory
        }) as BookRecordResult
        return results.map(obj=>new BookRecord(obj))
    }

    
    async delete():Promise<void>{
        await pool.execute("DELETE FROM `books` WHERE `id`= :id",{
            id: this.id
        })
    }


}

