import * as express from 'express';
var exec = require('child_process').exec;

const ApiRoutes = express.Router();

ApiRoutes.get('/', (req: express.Request, res: express.Response) => {
    res.send("Api Hello");
});

ApiRoutes.get('/test', (req: express.Request, res: express.Response) => {
    res.send({ "hi": "hello", "status": 200 });
});

ApiRoutes.get('/ip', (req: express.Request, res: express.Response) => {
    exec('ifconfig -a', (error: any, stdout: any, stderr: any) => {
        var msg: String;

        if (error) {
            msg = 'error: ' + error.message;
        }

        if (stderr) {
            msg = ' stderr ' + stderr;
        }

        msg = stdout;

        res.send(msg);
    });
});


export default ApiRoutes;
