import express from 'express';
import http from 'http';
import uaParser from 'ua-parser-js';
import SocketIo from 'socket.io';

const app = express();
const server = http.Server(app);
const io = new SocketIo(server);

// login user list
const users = [];

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

io.on('connect', (socket) => {
  console.log('server connected');

  socket.on('login', (name) => {
    if (users.length < 2) {
      users.push(name);
      io.emit('success');

      console.log(`${name} login`);
    } else {
      io.emit('reject');

      console.log(`${name} reject`);
    }
  });
});

server.listen(3000);
