import { Request, Response } from "express";
import { issueServices } from "./issue.service";

const createGithubIssue = async (req: Request, res: Response) => {
    try {
        const payload = req.body;

        const result = await issueServices.addGithubIssue(payload);

        res.status(200).json(result);
    } catch (error) {
        res.status(200).send("issue creation failed");
    }

};

export const issueControllers = {
    createGithubIssue
}