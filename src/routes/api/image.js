import Router from '@koa/router';
import send from 'koa-send';

export default class {
  constructor() {
    this.router = new Router();

    this.init();
  }

  init() {
    this.router
      .get('/', async (ctx, next) => {
        await send(ctx, 'esp.jpg')
        await next();
      });
  }
}