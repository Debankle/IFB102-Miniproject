import * as express from 'express';
import bcrypt from 'bcrypt';
var exec = require('child_process').exec;
import { createToken, verifyToken } from '../config/jwtMiddleware';


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

ApiRoutes.post('/login', (req: express.Request, res: express.Response) => {
    bcrypt.compare(req.body.password, passwordHash, (err: Error, same: boolean) => {
        if (same) {
            var token = createToken();
            res.status(200).json({ status: 200, token: token.str });
        } else {
            res.json({ status: 403, message: 'Incorrect Password' });
        }
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
        res.json({ status: 200, message: msg });
    });
});


ApiRoutes.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('poop');
    var token = req.body.token || req.body.query || req.headers['x-access-token'];
    console.log(token);
    if (verifyToken(token)) {
        next();
    } else {
        res.json({ status: 403, message: 'not authorised' });
    }
});


export default ApiRoutes;
