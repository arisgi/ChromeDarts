import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import views from 'koa-views';

const app = new Koa();
const router = Router();

app.use(serve('public'));
app.use(views('public', { map: { html: 'pug' } }));

router.get('/', async (ctx, next) => {
  await ctx.render('index.pug');
});

router.get('/sp', async (ctx, next) => {
  await ctx.render('sp.pug');
});

app.use(router.routes());
app.use(router.allowedMethods);

app.listen(3000);
