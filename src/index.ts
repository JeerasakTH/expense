import express, { Request, Response } from 'express';
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const port = process.env.PORT || 3002

console.log(process.env.PORT)

app.get("/", (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!')
})

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})