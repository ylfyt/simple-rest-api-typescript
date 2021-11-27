import { Request, Response } from 'express';
import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Users from '../models/User';

const schema = Joi.object({
	username: Joi.string().min(4).required(),
	password: Joi.string().min(3).required(),
});

export const register = async (req: Request, res: Response) => {
	const validation = schema.validate(req.body);
	if (validation.error) {
		return res.status(400).json({ error: validation.error.details[0].message });
	}

	try {
		const userExist = await Users.findOne({ username: req.body.username });
		if (userExist) {
			return res.status(400).json({ error: 'User is already exist' });
		}

		// Hashing the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		const newUser = new Users({ username: req.body.username, password: hashedPassword });
		const savedUser = await newUser.save();
		return res.json({ id: savedUser.id, username: savedUser.username });
	} catch (error) {
		let result = (error as Error).message;
		res.status(404).json({ error: result });
	}
};

export const login = async (req: Request, res: Response) => {
	const validation = schema.validate(req.body);
	if (validation.error) {
		return res.status(400).json({ error: validation.error.details[0].message });
	}

	try {
		const userExist = await Users.findOne({ username: req.body.username });
		if (!userExist) {
			return res.status(400).json({ erorr: 'Username or password is wrong' });
		}
		const valid = bcrypt.compareSync(req.body.password, userExist.password);
		if (!valid) {
			return res.status(400).json({ erorr: 'Username or password is wrong' });
		}

		// Logged in, Make jwt
		const token = jwt.sign({ id: userExist.id }, process.env.TOKEN_SECRET!);
		return res.header('auth-token', token).json({ token: token });
	} catch (error) {
		let result = (error as Error).message;
		res.status(404).json({ error: result });
	}
};
