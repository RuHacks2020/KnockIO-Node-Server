import Router from '@koa/router';

export default class {
  constructor() {
    this.router = new Router();

    this.init();
  }

  init() {
    this.router
      .get('/', async (ctx, next) => {
        ctx.body = "Hi!";
        await next();
      });
  }
}