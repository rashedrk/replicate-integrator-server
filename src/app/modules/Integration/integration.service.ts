import axios from "axios";
import { Integration } from "./integration.model";

const githubIntegration = async (code: string) => {
    try {
        const response = await axios.post('https://github.com/login/oauth/access_token', {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        }, {
          headers: {
            Accept: 'application/json',
          },
        });
    
        const accessToken = response.data.access_token;
    
        const userResponse = await axios.get('https://api.github.com/user/installations', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
    
        const installations = userResponse.data.installations[0];

       
  
        // console.log(installations);
        
        const integrationInfo = {
            integrationId: installations.id,
            type: 'github',
            owner: installations.account.login,
            appName: installations.app_slug,
        }
        // Save installations info to the database
        await Integration.create(integrationInfo)

        return integrationInfo;
    
      } catch (error) {
        return false;
      }
}

export const integrationServices = {
    githubIntegration
}