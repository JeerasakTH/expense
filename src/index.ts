import express, { Request, Response } from 'express';
import dotenv from 'dotenv'
import routes from './routes'
import cookieParser from "cookie-parser";

dotenv.config()

const app = express();
const port = process.env.PORT || 3002

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', routes)

app.get("/", (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!')
})

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})