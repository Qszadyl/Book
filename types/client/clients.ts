import { BookRecord } from "../../records/book.records"
import { BookEntity } from "../book"
import { BorrowsEntity } from "../borrows"
import { ClientEntity } from "./client.entity"


export type CreateClientReq = Omit<ClientEntity, 'id'>

export interface GetSingleClientRes{
    client: ClientEntity,
    books: BorrowsEntity[],
    counter: number, 

}
