import { BorrowRecord } from "../../records/borrow.records";
import { BorrowsEntity } from "../borrows";
import {BookEntity} from "./book.entity";

export type CreateBookReq = Omit<BookEntity, 'rentID'>;


export interface GetSingleBookRes{
    book: BookEntity,
    isBorrowed: boolean,
}