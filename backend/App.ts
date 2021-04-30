import { Application } from 'express';
import { MainRoutes, ApiRoutes } from './routes/router';
import morganMiddleware from './config/morganMiddleware';

const express = require('express');


class RaspiWebsiteBackend {
    public backend: Application;
    public port: number;
    public ip: string;

    constructor() {
        this.backend = express();
        this.port = 4200;
        this.ip = '127.0.0.1'
        
        this.initMiddleware();
        this.initRoutes();
    }

    public listen(): void {
        this.backend.listen(this.port, () => {
            console.log(`Server is running at ${this.ip}:${this.port}`);
        }).on('error', (err: Error) => {
            console.log(err);
        });
    }

    private initMiddleware(): void {
        this.backend.use(morganMiddleware);
        // this.backend.use(morgan(':date[clf] :remote-addr :user-agent HTTP/:http-version :method :url :res[content-length] :status :response-time'))
        this.backend.use(express.json())
        this.backend.use(express.urlencoded({
            extended: false
        }));
    }

    private initRoutes(): void {
        this.backend.use('/', MainRoutes);
        this.backend.use('/api', ApiRoutes);
    }
}

export default new RaspiWebsiteBackend();