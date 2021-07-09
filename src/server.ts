import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import Client from './db';
import user_routes from './handlers/user';
import misc_routes from './services/misc';

const app: express.Application = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', async (req: Request, res: Response) => {
	try {
		const conn = await Client.connect();
		conn.release();
		res.json('Successfully connected');
	} catch(err) {
		console.log(err);
		res.json('Not connected');
	}
});

user_routes(app);
misc_routes(app);

app.listen(port, () => {
    console.log(`Started server on 127.0.0.1:${port}`);
});