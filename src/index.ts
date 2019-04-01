import * as bodyParser from 'body-parser';
import { Logger, Env, Config } from './utils';
import * as Routes from './routes';

import helmet = require('helmet');
import cors = require('cors');
import celebrate = require('celebrate');
import express = require('express');
import http = require('http');
import compression = require('compression');

class App {
    public app: express.Express;
    public server: http.Server;

    public constructor() {
        this.start();
    }

    public async start(): Promise<void> {
        const app: express.Express = express();
        const server = new http.Server(app);

        if (Env.isProd) {
            app.enable('trust proxy');
        }
        app.use(helmet());
        app.use(
            cors({
                origin: (origin, callback) => {
                    const protocols = ['http', 'https'];
                    const matches: boolean = protocols.some(protocol =>
                        Config.cors.some(host => `${protocol}://${host}` === origin)
                    );
                    if (matches) {
                        callback(null, true);
                    } else {
                        callback(new Error());
                    }
                },
                optionsSuccessStatus: 200
            })
        );
        app.use(compression());
        app.use(bodyParser.json());

        Object.values(Routes.Api).map(value => app.use(value));
        app.use(celebrate.errors());

        app.listen(Config.port, () => {
            Logger.info(`worker started | server listening on port: ${Config.port}`);
        });

        this.app = app;
        this.server = server;
    }
}
const app = new App();
