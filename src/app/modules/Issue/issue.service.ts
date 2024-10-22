
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
      installationId: Number(payload.integrationId) ,
      owner: integration.owner, 
      repo: payload.repo, 
      title: payload.title,
      body: payload.message,
    }

    const response = await  createGithubIssue(issue);
    
    


    // console.log('Issue created successfully:', response);

    // save the created issue details in your database
    const result = await Issues.create({ ...payload, githubIssueId: response.id });
    return result;

    return response.data; // Return the created issue data or any other relevant info
  } catch (error) {
    console.error('Error creating GitHub issue:', error);
    throw error; // Re-throw error if you want to handle it upstream
  }
};



export const issueServices = {
  addGithubIssue
}