import express, { Express, Request, Response } from 'express';
import { PORT, MONGO_CONNECTION_STRING } from './config';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from './modules/Users/users.routes';

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//mongo db connect
mongoose
  .connect(MONGO_CONNECTION_STRING, { autoIndex: true })
  .then(() => {
    console.log('DB CONNECTED');
  })
  .catch(() => {
    console.log('DB REFUSED TO CONNECT');
  });

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello Express!');
});

app.use('/api', userRoute);

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
