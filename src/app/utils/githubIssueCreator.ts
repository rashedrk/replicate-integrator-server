import axios from "axios";
import { getValidAccessToken } from "./githubAuth";

type TGithubIssue = {
    installationId: number,
    owner: string,
    repo: string,
    title: string,
    body: string
}

export const createGithubIssue = async (issue: TGithubIssue) => {
    const { installationId, owner, body, repo, title } = issue;
    try {
        const token = await getValidAccessToken(installationId);
        const response = await axios.post(
            `https://api.github.com/repos/${owner}/${repo}/issues`,
            { title, body },
            {
                headers: {
                    Authorization: `token ${token}`,
                    Accept: 'application/vnd.github.v3+json',
                },
            }
        );
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Error creating GitHub issue:', error.response?.data || error.message);
        throw error;
    }
};
