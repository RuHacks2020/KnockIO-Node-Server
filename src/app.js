import Koa from 'koa';
import Router from '@koa/router';
import Cors from '@koa/cors';

import config from '../configs.json';
import { server } from './library/logger';
import ESP from './services/ESP';

import database from './database/database';
import settings from './database/collections/settings';

import RouterService from './routes/router';

class KnockService {
  constructor() {
    server("Initializing KnockService...");
    this.app = new Koa();
    this.router = new Router();
    this.routerService = new RouterService();
    this.esp = ESP();

    this.start();
  }

  start() {
    this.esp.then(() => {
      this.setupDatabase().then(() => {
        this.routerService.init().then(() => {
          this.router.use('*', this.routerService.router.routes(), this.routerService.router.allowedMethods());

          this.app
            .use(Cors())
            .use(this.router.routes())
            .use(this.router.allowedMethods())
            .listen(config.server.port, () => {
              server(`KnockIO Web Server started on port ${config.server.port}.`);
            });
        });
      })
    })
  }

  setupDatabase() {
    return new Promise(resolve => {
      if (config.database.enabled) {
        database().then(() => {
          settings();

          resolve();
        })
      } else {
        resolve();
      }
    });
  }
}

new KnockService();