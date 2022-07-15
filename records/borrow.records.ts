import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";
import { v4 as uuid } from 'uuid';
import { FieldPacket } from "mysql2";
import {BookEntity, BorrowsEntity} from "../types";
import {BookRecord} from "./book.records";
import { isDataView } from "util/types";
import * as PoolCluster from "mysql2/typings/mysql/lib/PoolCluster";

type BorrowRecordResult = [BorrowsEntity[], FieldPacket[]];


export class BorrowRecord implements BorrowsEntity{
    rentId?: string;
    bookId: string;
    clientId: string;
    startRent: string;
    endRent: string | null;
    state: boolean;
    title: string

    constructor(obj: BorrowsEntity){
        this.rentId = obj.rentId;
        this.bookId = obj.bookId;
        this.clientId = obj.clientId;
        this.startRent = obj.startRent;
        this.endRent = obj.endRent;
        this.state = obj.state
    }


    async insert():Promise<string>{
        if(!this.rentId){
            this.rentId = uuid()
        }
        await pool.execute("INSERT INTO `rentals` VALUES (:rentId, :bookId, :clientId, :startRent, :endRent, :state)",{
            rentId: this.rentId,
            bookId: this.bookId,
            clientId: this.clientId,
            startRent: this.startRent,
            endRent: this.endRent,
            state: this.state
        })
        return this.rentId;
    }

    static async getAllBorrows():Promise<BorrowRecord[]>{
        const [results] = await pool.execute("SELECT * FROM `rentals` JOIN `clients` ON `rentals`.`clientId` = `clients`.`id` JOIN `books` ON `rentals`.`bookId` = `books`.`id` " ) as BorrowRecordResult;
        // const [results] = await pool.execute("SELECT *  FROM `rentals`") as BorrowRecordResult;
        // const [results] = await pool.execute("SELECT * FROM `rentals` JOIN `clients` ON `clients`.`id` = `rentals`.`clientId` JOIN `books` ON  `books`.`id` = `rentals`.`bookId` ") as BorrowRecordResult;
        // const [results] = await pool.execute("SELECT `rentId`, `books`.`title` , `clients`.`name`, `startRent`, `endRent`, `state` FROM `rentals`JOIN `clients` ON `rentals`.`clientId` = `clients`.`id` JOIN `books` ON `rentals`.`bookId` = `books`.`id`") as BorrowRecordResult;
        // const [results] = await pool.execute("SELECT `rentId`, `books`.`title` , `clients`.`name`, `startRent`, `endRent`, `state` FROM `rentals` JOIN `clients` ON  `clients`.`id` = `rentals`.`clientId` JOIN `books` ON `books`.`id` = `rentals`.`bookId`") as BorrowRecordResult;
        
        return results.map(obj=>new BorrowRecord(obj))
    }

   

    static async getOne(id:string):Promise<BorrowRecord | null>{
        const [results] = await pool.execute("SELECT * FROM `rentals` WHERE rentId = :id",{
            id
        }) as BorrowRecordResult;
        return results.length === 0 ? null : new BorrowRecord(results[0])
    }

    static async isBookBorrowed(idBook:string):Promise<boolean>{
        const [results] = await pool.execute("SELECT * FROM `rentals` WHERE bookId = :idBook AND state = true", {
            idBook
        })as BorrowRecordResult;
        return results.length === 0 ? true : false
    }

    static async getOneBook(id:string): Promise<BorrowRecord[]>{
        const [results] = await pool.execute("SELECT * FROM `rentals` WHERE bookId = :id",{
            id
        }) as BorrowRecordResult;
        // return results.length === 0 ? null : new BorrowRecord(results[0])
        return results.map(obj=>new BorrowRecord(obj))
    }

    static async returnBook(id:string): Promise<void>{
        await pool.execute("UPDATE `rentals` SET `endRent`' :endRent, `state`:state ", {
            endRent: String(new Date()),
            state:  false
        })
    }



    static async getAllBookUser(id:string): Promise<BorrowRecord[] | null>{
        const [results] = await pool.execute("SELECT * FROM `rentals` WHERE clientId = :id",{
            id
        }) as BorrowRecordResult;
        return results.length === 0 ? null : results.map(obj=>new BorrowRecord(obj))
    }

     static async countUserBooks(id:string): Promise<number>{
        const [results] = await pool.execute("SELECT * FROM `rentals` WHERE clientId = :id",{
            id
        }) as BorrowRecordResult;
        return results.length === 0 ? 0 : results.length
    }

    async update():Promise<void>{
        await pool.execute("UPDATE `rentals` SET `state`= :state, `endRent` = :endRent WHERE `rentId` = :rentId ",{
            rentId: this.rentId,
            state: this.state,
            endRent: this.endRent
        })
    }
}

