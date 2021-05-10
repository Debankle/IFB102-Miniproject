import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const secret: jwt.Secret = "401275e0b162b6c8b93db0c31a3d63d87ceb1a1a3ed5263c292de6cec61410a0";

interface tokenReturn {
    status: number;
    str: string;
}

export function createToken(): tokenReturn {
    var token = jwt.sign({
        created: Date.now()
    }, secret, { expiresIn: '30m' });

    if (token === '') {
        return { status: 400, str: 'empty' }
    } else {
        return { status: 200, str: token }
    }
}

export function verifyToken(token: string): boolean {
    jwt.verify(token, secret, (err: any, decoded: any) => {
        if (err) {
            return false;
        } else {
            
        }
    });

    return false;
}