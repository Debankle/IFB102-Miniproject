import * as express from 'express';
import bcrypt from 'bcrypt';
import { createToken } from '../config/jwtMiddleware';

const passwordHash = '$2b$10$sIWJf623Q1oOE/5I/ydt9ezY/hKYJqtxZw8F9m8KX507kfV2aNrA2'

const LoginRoutes = express.Router();

LoginRoutes.post('', (req: express.Request, res: express.Response) => {
    bcrypt.compare(req.body.password, passwordHash, (err: Error, same: boolean) => {
        if (same) {
            res.json({ status: 200, token: 'sss' });
        }
    });
});

LoginRoutes.get('/verify', (req: express.Request, res: express.Response) => {
    if (req.body.token) {
        res.json({ status: 200, message: 'route it' });
    }
});

export default LoginRoutes;