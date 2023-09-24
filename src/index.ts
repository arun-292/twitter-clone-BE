import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from './modules/Users/users.routes';
import tweetsRoute from './modules/Tweets/tweets.routes';
import 'dotenv/config';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app: Express = express();
const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});
httpServer.listen(5000);

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//mongo db connect
mongoose
  .connect(process.env.DATABASE, { autoIndex: true })
  .then(() => {
    console.log('DB CONNECTED');
  })
  .catch(() => {
    console.log('DB REFUSED TO CONNECT');
  });

// Routes
app.use('/api/auth', userRoute);
app.use('/api/tweets', tweetsRoute);

// Start Express Server
app.listen(process.env.PORT, () => {
  return console.log(`Express is listening at http://localhost:${process.env.PORT}`);
});
