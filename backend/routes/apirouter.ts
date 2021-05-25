import * as express from 'express';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
var exec = require('child_process').exec;

const passwordHash = '$2b$10$sIWJf623Q1oOE/5I/ydt9ezY/hKYJqtxZw8F9m8KX507kfV2aNrA2'
const secret: jwt.Secret = "401275e0b162b6c8b93db0c31a3d63d87ceb1a1a3ed5263c292de6cec61410a0";


const ApiRoutes = express.Router();


ApiRoutes.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.url !== '/login' && req.url !== '/verifyToken') {
        const token = req.headers.authorization || '';
        jwt.verify(token, secret, (err: any, decoded: any) => {
            if (err) {
                res.status(401).send({ status: 401, message: err });
            } else {
                next();
            }
        });
    } else {
        next();
    }
});

ApiRoutes.get('/', (req: express.Request, res: express.Response) => {
    res.send("Api Hello");
});

ApiRoutes.get('/users', (req: express.Request, res: express.Response) => {
    res.status(200).json([{
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
            const time = Date.now();
            try {
                const token = jwt.sign({ time: time }, secret, { expiresIn: '1h' });
                res.status(200).send({ status: 200, token: token });
            } catch (err) {
                res.status(401).send({ status: 401, message: "There was an error signing in" });
                console.log(err);
            }
        } else {
            res.status(401).send({ status: 401, message: "Incorrect Password" });
        }
    });
});

ApiRoutes.get('/verifyToken', (req: express.Request, res: express.Response) => {
    const token = req.body.token || '';
    try {
        const decoded = jwt.verify(token, secret);
        res.status(200).send({ status: 200, message: 'Token Verified' });
    } catch (err) {
        res.status(401).send({ status: 401, message: err });
    }
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
        res.status(200).json({ status: 200, data: msg });
    });
});

ApiRoutes.get('/temp', (req: express.Request, res: express.Response) => {
    exec('vcgencmd measure_temp', (error: any, stdout: any, stderr: any) => {
        var msg: String;
        if (error) {
            msg = 'error: ' + error.message;
        }
        if (stderr) {
            msg = ' stderr ' + stderr;
        }
        msg = stdout;
        res.status(200).json({ status: 200, data: msg });
    });
});

ApiRoutes.get('/storage', (req: express.Request, res: express.Response) => {
    exec('df', (error: any, stdout: any, stderr: any) => {
        var msg: String;
        if (error) {
            msg = 'error: ' + error.message;
        }
        if (stderr) {
            msg = ' stderr ' + stderr;
        }
        msg = stdout;
        res.status(200).json({ status: 200, data: msg });
    });
});

ApiRoutes.get('/ram', (req: express.Request, res: express.Response) => {
    exec('free -h', (error: any, stdout: any, stderr: any) => {
        var msg: String;
        if (error) {
            msg = 'error: ' + error.message;
        }
        if (stderr) {
            msg = ' stderr ' + stderr;
        }
        msg = stdout;
        res.status(200).json({ status: 200, data: msg });
    });
});

ApiRoutes.get('/struct', (req: express.Request, res: express.Response) => {
    exec('tree ~ -x -L 3', (error: any, stdout: any, stderr: any) => {
        var msg: String;
        if (error) {
            msg = 'error: ' + error.message;
        }
        if (stderr) {
            msg = ' stderr ' + stderr;
        }
        msg = stdout;
        res.status(200).json({ status: 200, data: msg });
    });
});

ApiRoutes.post('/custom', (req: express.Request, res: express.Response) => {
    exec(req.body.command, (error: any, stdout: any, stderr: any) => {
        var msg = '';
        if (error) {
            msg += 'error: ' + error.message;
        }
        if (stderr) {
            msg += ' stderr: ' + stderr;
        }
        msg += stdout;
        res.status(200).json({ status: 200, data: msg });
    })
});

export default ApiRoutes;
