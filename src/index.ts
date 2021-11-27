import Express from 'express';
import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';

// Import Router
import studentRouter from './routes/students_router';
import userRouter from './routes/users_router';
import postsRouter from './routes/posts_router';
import { verify } from './routes/verifyToken';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = Express();

// Middleware
app.use(Express.json());
app.use(cors());

// Router
app.use('/api/students', studentRouter);
app.use('/api/posts', verify, postsRouter);
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
	res.send('<h1>Hello, World</h1>');
});

// DB Connection
mongoose.connect(process.env.DB_CONNECT!, { useNewUrlParser: true } as ConnectOptions, () => console.log('DB is Connected!'));
app.listen(PORT, () => console.log('Listening on port ' + PORT));
