import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import views from 'koa-views';

const app = new Koa();
const router = Router();

app.use(serve('public'));
app.use(views('public', { extensions: 'pug' }));

router.get('/', async (ctx, next) => {
  await ctx.render('index');
});

router.get('/sp', async (ctx, next) => {
  await ctx.render('sp');
});

app.use(router.routes());
app.use(router.allowedMethods);

app.listen(3000);
