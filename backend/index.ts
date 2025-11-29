import express from 'express';
import cookieParser from 'cookie-parser';
import type { Request, Response } from 'express';
import authRouter from './route/auth.route';
import taskRouter from './route/task.route'
import cors from 'cors'

const app = express();
const port = 8000;
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter);
app.use('/api/task', taskRouter)

app.get('/', (req: Request, res: Response): void => {
    res.send('Hello form Backend Assignment !');
});

app.listen(port, (): void => {
    console.log(`Server is running at http://localhost:${port}`);
});
