import { getAuthenticatedOctokit } from "../../utils/githubAuth";
import { Integration } from "../Integration/integration.model";
import { TIssue } from "./issue.interface";
import { Issues } from "./issue.model";


const createGithubIssue = async (payload: TIssue) => {
  try {
    // Validate the payload
    if (!payload.integrationId || !payload.repo || !payload.title || !payload.message) {
      throw new Error('Missing required fields in the payload');
    }

    // Get authenticated Octokit instance
    const octokit = await getAuthenticatedOctokit(Number(payload.integrationId));

    // Fetch the integration data to get owner info
    const integration = await Integration.findOne({ integrationId: payload.integrationId });
    if (!integration) {
      throw new Error(`Integration not found for ID: ${payload.integrationId}`);
    }

    // Create the issue on GitHub
    const response = await octokit.rest.issues.create({
      owner: integration.owner, // Ensure this is valid
      repo: payload.repo, // Ensure this is valid
      title: payload.title,
      body: payload.message,
    });

    console.log('Issue created successfully:', response.data);

    // Optionally save the created issue details in your database
    // const result = await Issues.create({ ...payload, githubIssueId: response.data.id });
    // return result;

    return response.data; // Return the created issue data or any other relevant info
  } catch (error) {
    console.error('Error creating GitHub issue:', error);
    throw error; // Re-throw error if you want to handle it upstream
  }
};



export const issueServices = {
  createGithubIssue
}