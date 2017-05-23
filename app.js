import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.listen(3000);
