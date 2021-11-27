import Express from 'express';
import { verify } from './verifyToken';
import jwt from 'jsonwebtoken';

const router = Express.Router();

router.get('/', verify, (req: Express.Request, res) => {
	const token = req.header('auth-token');
	const verified = jwt.verify(token!, process.env.TOKEN_SECRET!);
	res.send(verified);
});

export default router;
