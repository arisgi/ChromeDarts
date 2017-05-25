import Koa from 'koa';

const app = new Koa();

app.use((ctx) => {
  ctx.body = 'Koa test';
});

app.listen(3000);
