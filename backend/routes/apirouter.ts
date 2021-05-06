import * as express from 'express';
import bcrypt from 'bcrypt';
var exec = require('child_process').exec;

const passwordHash = '$2b$10$sIWJf623Q1oOE/5I/ydt9ezY/hKYJqtxZw8F9m8KX507kfV2aNrA2'

const ApiRoutes = express.Router();

ApiRoutes.get('/', (req: express.Request, res: express.Response) => {
    res.send("Api Hello");
});

ApiRoutes.get('/users', (req: express.Request, res: express.Response) => {
    res.json([{
        id: 1,
        username: 'oliver'
    }, {
        id: 2,
        username: 'poopy'
    }]);
});

ApiRoutes.post('/test', (req: express.Request, res: express.Response) => {
    bcrypt.compare(req.body.password, passwordHash, (err: Error, same: boolean) => {
        res.send(same);
    });
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
