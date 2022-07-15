import * as express from 'express';
import { Request, Response} from 'express';
import { NextFunction } from 'express-serve-static-core';
const app = express();

export class ValidationError extends Error{}


export const handleError = (err: Error ,req: Request ,res: Response,next: NextFunction):void =>{
    //była by możliwość do wchodzenia do elementu który nie isteniej

    console.error(err);

    res

    .status(err instanceof ValidationError ? 400 : 500)
    .json({
        message: err instanceof ValidationError ? err.message : 'Przepraszamy spróbuj ponownie za kilka minut'
    });

};