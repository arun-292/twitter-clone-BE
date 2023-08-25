import express from 'express';
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello Express 5!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
