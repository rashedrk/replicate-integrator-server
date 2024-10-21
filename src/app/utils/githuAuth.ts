import { createAppAuth } from "@octokit/auth-app";
import { Octokit } from "@octokit/rest";

const privateKey = process.env.PRIVATE_KEY!.replace(/\\n/g, '\n');

export const getAuthenticatedOctokit = async (installationId: number) => {
  const auth = createAppAuth({
    appId: process.env.GITHUB_APP_ID as string,
    privateKey,
    installationId,
  });

  const installationAuth = await auth({
    type: "installation"});

  const octokit = new Octokit({
    auth: installationAuth.token,
  });

  return octokit;
};
