import express, { Request, Response } from "express";


export const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send(`Hi Assignment_2`);
});

