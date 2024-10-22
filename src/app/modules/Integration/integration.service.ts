import axios, { HttpStatusCode } from "axios";
import { Integration } from "./integration.model";
import AppError from "../../Error/AppError";
import config from "../../config/config";

const githubIntegration = async (code: string) => {
  try {
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: config.github_client_id,
      client_secret: config.github_client_secret,
      code,
    }, {
      headers: {
        Accept: 'application/json',
      },
    });

    const { access_token, refresh_token, expires_in } = tokenResponse.data;
    // Set expiration time
    const expiresAt = new Date(Date.now() + expires_in * 1000);

    const userResponse = await axios.get('https://api.github.com/user/installations', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const installations = userResponse.data.installations[0];



    // console.log(installations);

    const integrationInfo = {
      integrationId: installations.id,
      type: 'github',
      owner: installations.account.login,
      appName: installations.app_slug,
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresAt,
    }
    // Save installations info to the database
    await Integration.create(integrationInfo)

    return integrationInfo;

  } catch (error) {
    throw new AppError(HttpStatusCode.BadRequest, 'Github integration failed!')
  }
}

const removeGithubIntegration = async (integrationId: number) => {
  try {
    // Find the integration in the database
    const integration = await Integration.findOne({ integrationId });

    if (!integration) {
      throw new AppError(HttpStatusCode.NotFound, 'Github integration not found');
    }
    

    // Revoke the installation from GitHub
    await axios.delete(
      `https://api.github.com/app/installations/${integrationId}`,
      {
        headers: {
          Authorization: `Bearer ${integration.accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    // Remove the integration from the database
    await Integration.deleteOne({ integrationId });

    return ;
  } catch (error) {
    console.error('Error disconnecting integration:', error);
    throw new AppError(500, 'Failed to disconnect integration');
  }
}

export const integrationServices = {
  githubIntegration,
  removeGithubIntegration
}