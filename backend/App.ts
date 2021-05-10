import express, { Application } from 'express';
import { MainRoutes, ApiRoutes, LoginRoutes } from './routes/router';
import morganMiddleware from './config/morganMiddleware';
import * as http from 'http';


class RaspiWebsiteBackend {
    public app: Application;
    public port: string;
    public ip: string;
    public server: http.Server;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '4200';
        this.ip = '127.0.0.1';
        this.server = http.createServer(this.app);

        this.initDefaults();
        this.initMiddleware();
        this.initRoutes();
    }

    public listen(): void {
        this.server.listen(this.port, () => {
            var addr = this.server.address();
            var bind = typeof addr === 'string' ? addr : this.port;
            console.log(`The server is running on ${this.ip}:${bind}`);
        }).on('error', (err: Error) => {
            console.log(err);
        });
    }

    private initDefaults(): void {
        this.app.set('port', this.port);
    }

    private initMiddleware(): void {
        this.app.use(morganMiddleware);
        this.app.use(express.json())
        this.app.use(express.urlencoded({
            extended: false
        }));
    }

    private initRoutes(): void {
        this.app.use('/', MainRoutes);
        this.app.use('/api', ApiRoutes);
        this.app.use('/login', LoginRoutes);
    }
}

export default new RaspiWebsiteBackend();