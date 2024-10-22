import express, { Application, Request, Response } from "express";
import cors from "cors";
import { integrationRoutes } from "./app/modules/Integration/integration.route";
import { issueRoutes } from "./app/modules/Issue/issue.route";
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('Replicate Integration Server is available');
});

//application routes
// app.use('/api/v1', router);
// Routes
app.use('/integrate', integrationRoutes);
app.use('/issue', issueRoutes);

export default app;