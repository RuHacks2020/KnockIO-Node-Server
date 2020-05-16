import Router from '@koa/router';
import loader from '../library/loader';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { router as logRouter } from '../library/logger';

export default class RouterService {
  constructor() {
    this.router = new Router();
    this.__dirname = dirname(fileURLToPath(import.meta.url));
  }

  init() {
    return new Promise(resolve => {
      const routes = loader(this.__dirname, '.js', ['router.js']);

      for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        const localPath = route.replace(`${this.__dirname}\\`, "");
        const splitPath = localPath.split(`\\`);
        const routePath = `/${splitPath[0]}/${splitPath[1].replace('.js', '')}`;

        import(route).then(module => {
          const middleware = new module.default();
          this.router.use(routePath, middleware.router.routes(), middleware.router.allowedMethods());

          logRouter(`Successfully added route ${routePath}`);

          if (i === routes.length-1) {
            resolve();
          }
        });
      }
    });
  }
}