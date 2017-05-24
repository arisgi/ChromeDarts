import express from 'express';
import uaParser from 'ua-parser-js';

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/sp', (req, res) => {
  const ua = uaParser(req.headers['user-agent']);

  if (ua.device.type === 'mobile' && ua.os.name === 'iOS') {
    res.sendFile(`${__dirname}/public/sp.html`);
  } else {
    res.send('iPhoneからアクセスしてください。');
  }
});

app.listen(3000);
