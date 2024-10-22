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


const getAccessibleRepoList = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await issueServices.getRepositories(Number(id))
    res.status(200).json(result);

};

export const issueControllers = {
    createGithubIssue,
    getAccessibleRepoList
}