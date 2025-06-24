import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import apiRoute from './routes';
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', apiRoute);

app.use(errorHandler);

export default app;
