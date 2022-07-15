import {Router} from 'express';
import {ClientRecord} from "../records/client.records";
import {BookRecord} from "../records/book.records";
import { BorrowsEntity, CreateBorrowReq, GetSingleBorrowRes, ListBorrowsRes, SetBorrowForBookReq } from '../types'
import {ValidationError} from '../utils/errors'
import { BorrowRecord } from '../records/borrow.records';


export const borrowRouter = Router();


borrowRouter

.get('/', async (req,res)=>{
    // const borrowsList = await BorrowRecord.getAllBorrows();
    const borrowsList = await BorrowRecord.getAllBorrows();
    // const clientsList = await ClientRecord.listAll();
    // const booksList = await BookRecord.bookAll();

    res.json({
        borrowsList,
        // clientsList,
        // booksList  
    }) 
})

.get('/:borrowId', async (req,res)=>{
    const borrow = await BorrowRecord.getOne(req.params.borrowId);
  
    const numberOfBooks = await BorrowRecord.countUserBooks(req.params.borrowId)
    res.json({
        borrow,
        numberOfBooks
    })
})

.get('/isBorrowed/:borrowId', async (req,res)=>{
    const borrow = await BorrowRecord.getOne(req.params.borrowId);
  
  
    res.json({
        borrow,
        
    })
})

.get('/clientBorrows/:clientId', async (req,res)=>{
    const userAllBooks = await BorrowRecord.getAllBookUser(req.params.clientId);
    const books = await BookRecord.bookAll();
    res.json({
        userAllBooks,
        books
    })
})

.get('/borrowBook/:bookId',async (req,res)=>{
    const clients = await ClientRecord.listAll();
    const book = await BookRecord.getOne(req.params.bookId);
    const isBorrowed = await BorrowRecord.isBookBorrowed(req.params.bookId);

    res.json({
        clients,
        book,
        isBorrowed
    })
})



.post('/', async (req,res)=>{
    const newBorrow = new BorrowRecord(req.body as CreateBorrowReq)
    await newBorrow.insert();

    res.json(newBorrow);
})


.patch('/returnBook/:id', async (req,res)=>{
    const borrow = await BorrowRecord.getOne(req.params.id);

    if(borrow === null){
        throw new ValidationError('Nie znaleziono  wypożyczenia z podanym ID');
    }
    const time = new Date();

    borrow.endRent = String(time);
    borrow.state = false;
    borrow.update()
     res.json(borrow)
})

.patch('/getBook/:id', async (req,res)=>{
    const borrow = await BorrowRecord.getOne(req.params.id);

    console.log(borrow);
    if(borrow === null){
        throw new ValidationError('Nie znaleziono  wypożyczenia z podanym ID');
    }
    
    borrow.state = true;
    borrow.update()
     res.json(borrow)
})


