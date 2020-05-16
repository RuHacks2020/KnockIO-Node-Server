import Koa from 'koa';

import config from '../configs.json';
import { server } from './library/logger';

class KnockService {
    constructor() {
        server("Initializing KnockService...");
        this.app = new Koa();

        this.start();
    }

    start() {
        this.setupDatabase().then(() => {
            this.setupRoutes().then(() => {
                server('test');
                this.app.listen(config.server.port).then(() => {
                    server(`KnockIO Web Server started on port ${config.server.port}.`);
                });
            });
        })
    }

    setupDatabase() {
        return new Promise(resolve => {
            resolve();
        });
    }

    setupRoutes() {
        return new Promise(resolve => {
            resolve();
        });
    }
}

new KnockService();