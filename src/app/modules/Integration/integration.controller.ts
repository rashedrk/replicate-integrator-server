import { integrationServices } from './integration.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { HttpStatusCode } from 'axios';
import config from '../../config/config';

const githubIntegration = catchAsync(async (req, res) => {
    const { code } = req.query;

    const response = await integrationServices.githubIntegration(code as string)

    if (response) {
        res.redirect(`${config.base_url}/issue?id=${response?.integrationId}`);
    }
    else if (response === false) {
        res.status(500).json({ error: 'Error during GitHub App installation' });
    }
})

const removeGithubIntegration = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await integrationServices.removeGithubIntegration(Number(id))

    sendResponse(res, {
        statusCode: HttpStatusCode.Ok,
        success: true,
        message: "github integration removed successfully",
        data: result
    })

})


export const integrationControllers = {
    githubIntegration,
    removeGithubIntegration
}