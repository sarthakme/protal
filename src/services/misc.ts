import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';

const intro = async (req: Request, res: Response) => {
	res.json({message: "Welcome to our website, logged-in user"});
};

const jobs = async (req: Request, res: Response) => {
	const jobs = [{
		id: 1,
		name: 'Cleaning',
		owner: 'Butler',
		assignedTo: undefined
	}, {
		id: 2,
		name: 'Gardening',
		owner: 'Doctor',
		assignedTo: 'Raul'
	}];
	res.json(jobs);
};

const meme = async (req: Request, res: Response) => {
	if(req.body.code === 'PROTAL')
		res.sendFile(path.join(__dirname, '../../res/image.jpg'));
	else
		res.json();
};

const auth = async (req: Request, res: Response, next: Function): Promise<void> => {
    try {
        const str = req.headers.authorization;
        if (str === undefined) {
            res.redirect('/signupform'); // sign-up form will be created with frontend
            return;
        }
        const token = (str as string).split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET as string);
        next();
    } catch (err) {
        res.status(401);
        res.json(`Invalid token: ${err}`);
    }
};

const misc_routes = (app: express.Application): void => {
	app.get('/intro', auth, intro);
	app.get('/jobs', jobs);
	app.post('/meme', meme);
};

export default misc_routes;