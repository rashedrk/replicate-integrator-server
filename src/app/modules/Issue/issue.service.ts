
import axios from "axios";
import { getValidAccessToken } from "../../utils/githubAuth";
import { createGithubIssue } from "../../utils/githubIssueCreator";
import { Integration } from "../Integration/integration.model";
import { TIssue } from "./issue.interface";
import { Issues } from "./issue.model";


const addGithubIssue = async (payload: TIssue) => {
  try {
    // Validate the payload
    if (!payload.integrationId || !payload.repo || !payload.title || !payload.message) {
      throw new Error('Missing required fields in the payload');
    }



    // Fetch the integration data to get owner info
    const integration = await Integration.findOne({ integrationId: payload.integrationId });
    if (!integration) {
      throw new Error(`Integration not found for ID: ${payload.integrationId}`);
    }

    // Create the issue on GitHub
    const issue = {
      installationId: Number(payload.integrationId),
      owner: integration.owner,
      repo: payload.repo,
      title: payload.title,
      body: payload.message,
    }

    const response = await createGithubIssue(issue);

    // console.log('Issue created successfully:', response);

    // save the created issue details in your database
    const result = await Issues.create({ ...payload, githubIssueId: response.id });
    return result;

  } catch (error) {
    console.error('Error creating GitHub issue:', error);
    throw error; // Re-throw error if you want to handle it upstream
  }
};

const getRepositories = async (integrationId: number) => {
  try {
    const integration = await Integration.findOne({ integrationId });

    const accessToken = await getValidAccessToken(integrationId);


    if (!integration) {
      throw new Error('Integration not found');
    }

    const response = await axios.get(
      `https://api.github.com/user/installations/${integrationId}/repositories`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );
    const repositories = response.data.repositories;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const repositoryNames = repositories.map((repo: any) => repo.name);

    return repositoryNames;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw new Error('Could not fetch repositories');
  }
}



export const issueServices = {
  addGithubIssue,
  getRepositories
}