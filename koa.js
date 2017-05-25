import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';

const app = new Koa();
const router = Router();

app.use(serve('public'));

router.get('/', (ctx, next) => {
  ctx.body = '/';
});

router.get('/sp', (ctx, next) => {
  ctx.body = '/sp';
});

app.use(router.routes());
app.use(router.allowedMethods);

app.listen(3000);
