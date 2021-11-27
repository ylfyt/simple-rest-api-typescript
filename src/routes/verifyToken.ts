import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verify = (req: Request, res: Response, next: NextFunction) => {
	const token = req.header('auth-token');
	if (!token) {
		return res.status(401).json({ error: 'Access Denied' });
	}

	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET!);
		next();
	} catch (error) {
		return res.status(400).json({ error: 'Invalid Token' });
	}
};
