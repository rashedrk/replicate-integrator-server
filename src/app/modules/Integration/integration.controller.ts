import { Request, Response } from 'express';
import { integrationServices } from './integration.service';

const githubIntegration = async (req: Request, res: Response) => {
    const { code } = req.query;

    try {
        const response = await integrationServices.githubIntegration(code as string)

        if (response) {
            res.redirect(`http://localhost:3000/issue?id=${response?.integrationId}`);
        }
        else if (response === false) {
            res.status(500).json({ error: 'Error during GitHub App installation' });
        }
       
    } catch (error) {
        res.status(500).json({ error: 'Error during GitHub App installation' });
    }
};


export const integrationControllers = {
    githubIntegration
}