import { integrationServices } from './integration.service';
import catchAsync from '../../utils/catchAsync';

const githubIntegration = catchAsync(async (req, res) => {
    const { code } = req.query;

        const response = await integrationServices.githubIntegration(code as string)

        if (response) {
            res.redirect(`http://localhost:3000/issue?id=${response?.integrationId}`);
        }
        else if (response === false) {
            res.status(500).json({ error: 'Error during GitHub App installation' });
        }
})


export const integrationControllers = {
    githubIntegration
}