import * as express from 'express';
import * as path from 'path';

const MainRoutes = express.Router();

MainRoutes.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname + '/../../../frontend/index.html'));
});

MainRoutes.get('/hello', (req: express.Request, res: express.Response) => {
    res.send(`Hello, ${req.query.name}`);
});

export default MainRoutes;
