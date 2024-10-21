import { getAuthenticatedOctokit } from "../../utils/githuAuth";
import { TIssue } from "./issue.interface";
import { Issues } from "./issue.model";

const createIssue = async (payload: TIssue) => {

  try {
    const octokit = await getAuthenticatedOctokit(installationId);

    const response = await octokit.rest.issues.create({
      owner,
      repo,
      title,
      body,
    });

    const result = await Issues.create(payload);
    return result;
  } catch (error) {
    console.log(error);

  }


};
