import * as express from "express";
import * as cors from "cors";

import { handleError } from'./utils/errors';
import {bookRouter} from "./routers/book";
import {clientRouter} from "./routers/client";
import * as methodOverride from 'method-override';
import './utils/db';
import { borrowRouter } from "./routers/borrow";


const app = express();

// app.use(methodOverride('_method'));
app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(express.json());

app.use('/books', bookRouter);
app.use('/clients', clientRouter)
app.use('/borrows', borrowRouter);

app.listen(3001,'localhost',()=>{
    console.log("Listen on http://localhost:3001");
})
