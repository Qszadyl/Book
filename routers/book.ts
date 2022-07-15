import {Router} from 'express';
import {BookRecord} from "../records/book.records";
import { BorrowRecord } from '../records/borrow.records';
import {BookEntity,CreateBookReq, GetSingleBookRes} from '../types'
import {ValidationError} from '../utils/errors'

export const bookRouter = Router();

bookRouter

.get('/', async(req,res)=>{
    const bookList = await BookRecord.bookAll();

    res.json({
        bookList,
    });
})

.get('/:bookId', async(req,res)=>{
    const book = await BookRecord.getOne(req.params.bookId);
    const isBorrowed = await BorrowRecord.isBookBorrowed(req.params.bookId);
    // dla clienta
    // const countBookClients = await book.countGivenBook()
    res.json({
        book,
        isBorrowed,
        // countBookClients
    } as GetSingleBookRes)
})

.get('/searchBook/:title', async(req,res)=>{
    const searchBooks = await BookRecord.searchBookByTitle(req.params.title);

    res.json({
        searchBooks
    });
})

.get('/searchAuthor/:name', async (req,res)=>{
    const searchAuthor = await BookRecord.searchBookByAuthorName(req.params.name);

    res.json({
        searchAuthor
    })
})

.get('/searchCategory/:category', async (req,res)=>{
    const searchCategory = await BookRecord.searchBookByCategory(req.params.category);

    res.json({
        searchCategory
    })
})

.delete('/:id', async(req,res)=>{
    const book = await BookRecord.getOne(req.params.id);

    if(!book){
        throw new ValidationError('No such book')
    }

    
    await book.delete();
    res.end();
})

.post('/', async(req,res)=>{
    
    const newBook = new BookRecord(req.body as CreateBookReq);
    await newBook.insert();

    res.json(newBook)

})


