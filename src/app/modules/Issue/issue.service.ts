import { Octokit } from "octokit";
import { TIssue } from "./issue.interface";
import { Issues } from "./issue.model";

const addIssueToGithub = async (payload: TIssue) => {

    const octokit = new Octokit({
        auth: 'YOUR-TOKEN'
      })

    await octokit.request("POST /repos/{owner}/{repo}/issues", {
        owner: "octocat",
        repo: "hello-world",
        title: "Hello, world!",
        body: "I created this issue using Octokit!",
      });

    const result = await Issues.create(payload);
    return result;
};
