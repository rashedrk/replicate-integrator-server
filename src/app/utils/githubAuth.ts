import axios from 'axios';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const GITHUB_APP_ID = process.env.GITHUB_APP_ID;
const PRIVATE_KEY = process.env.GITHUB_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!GITHUB_APP_ID || !PRIVATE_KEY) {
  throw new Error('Missing GitHub App credentials in environment variables');
}

const getJwt = (): string => {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iat: now,
    exp: now + 600, // 10 minutes
    iss: GITHUB_APP_ID,
  };
  return jwt.sign(payload, PRIVATE_KEY, { algorithm: 'RS256' });
};

export const getInstallationAccessToken = async (installationId: number): Promise<string> => {
  const jwt = getJwt();
  const response = await axios.post(
    `https://api.github.com/app/installations/${installationId}/access_tokens`,
    {},
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );
  return response.data.token;
};