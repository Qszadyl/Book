import {BorrowsEntity} from './borrows.entity';
import {BookEntity} from "../book/book.entity";
import {ClientEntity} from "../client/client.entity"

export type CreateBorrowReq = Omit<BorrowsEntity,'rentId'>;

export interface ListBorrowsRes{
    clientList: ClientEntity[];
    bookList: BookEntity[];
    borrowList: BorrowsEntity[];
}

export interface GetSingleBorrowRes{
    borrow: BorrowsEntity
}

export interface SetBorrowForBookReq{
    bookId: string
}

export interface NumberOfBorrowBook{
    count: number
}


