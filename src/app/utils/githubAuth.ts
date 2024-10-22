import axios, { HttpStatusCode } from 'axios';
import { Integration } from '../modules/Integration/integration.model';
import config from '../config/config';
import AppError from '../Error/AppError';


const GITHUB_APP_ID = config.github_app_id;
const PRIVATE_KEY = config.github_private_key?.replace(/\\n/g, '\n');
const GITHUB_CLIENT_ID = config.github_client_id;
const GITHUB_CLIENT_SECRET = config.github_client_secret;

if (!GITHUB_APP_ID || !PRIVATE_KEY) {
  throw new AppError(HttpStatusCode.BadRequest,'Missing GitHub App credentials in environment variables');
}


export const refreshAccessToken = async (integrationId: number) => {
    const integration = await Integration.findOne({ integrationId });

    if (!integration || !integration.refreshToken) {
        throw new AppError(HttpStatusCode.BadRequest,'Refresh token not found for the given integration ID');
    }

    try {
        const response = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: GITHUB_CLIENT_ID,
            client_secret: GITHUB_CLIENT_SECRET,
            refresh_token: integration.refreshToken,
            grant_type: 'refresh_token',
        }, {
            headers: {
                Accept: 'application/json',
            },
        });

        const { access_token: newAccessToken, refresh_token: newRefreshToken, expires_in: newExpiresIn } = response.data;

        // Update the integration with the new tokens and expiration time
        integration.accessToken = newAccessToken;
        integration.refreshToken = newRefreshToken || integration.refreshToken; // GitHub may or may not return a new refresh token
        integration.expiresAt = new Date(Date.now() + newExpiresIn * 1000);

        await integration.save();

        return integration.accessToken;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw new AppError(HttpStatusCode.BadRequest,'Could not refresh access token');
    }
};


export const getValidAccessToken = async (integrationId: number) => {
  const integration = await Integration.findOne({ integrationId });

  if (!integration) {
      throw new AppError(HttpStatusCode.NotFound,'Integration not found');
  }

  const now = new Date();
  if (integration.expiresAt <= now) {
      // Token has expired, refresh it
      const newAccessToken = await refreshAccessToken(integrationId);
      return newAccessToken;
  }

  // Token is still valid
  return integration.accessToken;
};
