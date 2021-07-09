import { UserClass, User } from '../models/user';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const user = new UserClass();

const create = async (req: Request, res: Response) => {
	if(req.body.username === undefined || req.body.password === undefined) {
		res.json('Required fields empty');
		return;
	}
	const u: User = {
		username: req.body.username as string,
		password: req.body.password as string
	};
	const users = await user.create(u);
	if(users.username === '') {
		res.json('Error inserting into database');
		return;
	}
	const token = jwt.sign(users, process.env.TOKEN_SECRET as string);
	res.json(token);
};

const validate = async (req: Request, res: Response) => {
	if(req.body.username === undefined || req.body.password === undefined) {
		res.json('Required fields empty');
		return;
	}
	const u: User = {
		username: req.body.username as string,
		password: req.body.password as string
	};
	const users = await user.validate(u);
	if(users.username === '') {
		res.json('Invalid credentials');
		return;
	}
	const token = jwt.sign(users, process.env.TOKEN_SECRET as string);
	res.json(token);
};

const user_routes = (app: express.Application): void => {
	app.post('/signup', create);
	app.post('/signin', validate);
};

export default user_routes;