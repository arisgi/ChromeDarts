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

  // send the smart phone's sensor data to the browser
  socket.on('throw', (data) => {
    console.log(data);

    let deg, rad;
    const correctDeg = 15;
    const weightVel = 0.5;
    const correctVel = 5;
    // culculate deg
    if (data.orientation.x >= 0) {
      deg = (180 + correctDeg) - data.orientation.x;
    } else {
      if (data.orientation.x <= (correctDeg - 180)) {
        deg = Math.abs(data.orientation.x - correctDeg) - 180;
      } else {
        deg = -(180 - Math.abs(data.orientation.x - correctDeg));
      }
    }
    rad = deg * Math.PI / 180;

    let t = 2.44 / (((data.acceleration.y * weightVel) + correctVel) * Math.cos(rad));
    let x = -(data.acceleration.x * weightVel) * t * 1000;
    let y = ((((data.acceleration.y * weightVel) + correctVel) * Math.sin(rad) * t) - (4.9 * t * t)) * 1000;

    console.log(`t: ${t}`);
    console.log(`x: ${x}`);
    console.log(`y: ${y}`);

    io.emit('darts', { x, y });
  });
});

app.use(router.routes());
app.use(router.allowedMethods);
