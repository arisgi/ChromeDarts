import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import views from 'koa-views';
import uaParser from 'ua-parser-js';
import SocketIo from 'socket.io';

const app = new Koa();
const server = app.listen(3000);
const io = SocketIo.listen(server);
const router = Router();

app.use(serve('public'));
app.use(views('public', { map: { html: 'pug' } }));

router.get('/', async (ctx, next) => {
  await ctx.render('index.pug');
});

router.get('/sp', async (ctx, next) => {
  const ua = uaParser(ctx.request.headers['user-agent']);
  if (ua.device.type === 'mobile' && ua.os.name === 'iOS') {
    await ctx.render('sp.pug');
  } else {
    ctx.body = 'iPhoneからアクセスしてください。';
  }
});

// login users list
const users = [];

io.on('connection', (socket) => {
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

  // check current login users
  const currentUsers = [];
  socket.on('disconnect', () => {
    console.log('someone disconnected');

    for (let i = 0; i < users.length; i += 1) {
      io.emit(`check-${users[i]}`);
    }
  });

  socket.on('login-now', (name) => {
    console.log(`${name} now login`);
    currentUsers.push(name);
    console.log(currentUsers);
  });
});

app.use(router.routes());
app.use(router.allowedMethods);
