import express, { Application, Request, Response } from "express";
import cors from "cors";


const app: Application = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('Replicate Integration Server is available');
});

//application routes
// app.use('/api/v1', router);


export default app;