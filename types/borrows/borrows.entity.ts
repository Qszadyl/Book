export interface BorrowsEntity{
    rentId?: string,
    bookId: string,
    clientId: string,
    startRent: string,
    endRent: string | null,
    state: boolean,
}
