import express from 'express';
import { PORT, MONGO_CONNECTION_STRING } from './config';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// mongo db connect
// mongoose.connect(MONGO_CONNECTION_STRING, { autoIndex: true }).then(() => {
//   console.log('DB CONNECTED');
// });

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.get('/home', (req, res) => {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies);

  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies);
  res.json({ valid: true });
});

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
