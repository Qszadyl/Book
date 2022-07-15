import {Router} from 'express';
import { BorrowRecord } from '../records/borrow.records';
import {ClientRecord} from "../records/client.records";
// import {BookRecord} from "../records/book.records";
import {ClientEntity,CreateClientReq,GetSingleClientRes} from "../types"
import {ValidationError} from '../utils/errors';

export const clientRouter = Router();

clientRouter

.get('/', async(req,res)=>{
    const clientList = await ClientRecord.listAll();
    res.json({
        clientList
    });

})

.get('/:clientId', async(req,res)=>{
    const client = await ClientRecord.getOne(req.params.clientId);
    const books = await BorrowRecord.getAllBookUser(req.params.clientId);
    const counter = await BorrowRecord.countUserBooks(req.params.clientId)
    res.json({
        client,
        books,
        counter
    } as GetSingleClientRes
    
    )
})

.delete('/:id', async (req,res)=>{
    const deleteClient = await ClientRecord.getOne(req.params.id);

    if(!deleteClient){
        throw new ValidationError('No such client')
    }

    await deleteClient.delete();
    res.end();
})

.get('/search/:name', async (req,res) =>{
    const searchClients = await ClientRecord.searchClient(req.params.name);
    res.json({
        searchClients
    })
})

.post('/', async (req,res)=>{
    const newClient = new ClientRecord(req.body as CreateClientReq);
    await newClient.insert();

    res.json(newClient);
})
