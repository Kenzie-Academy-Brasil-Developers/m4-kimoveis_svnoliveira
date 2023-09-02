import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import { handleError } from './middlewares';
import { categoryRouter, realEstateRouter, sessionRouter, userRouter } from './routers';


const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/login', sessionRouter);
app.use('/categories', categoryRouter);
app.use('/realEstate', realEstateRouter);

app.use( handleError.error );
export default app;
