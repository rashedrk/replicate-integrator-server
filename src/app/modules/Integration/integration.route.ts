import { Router } from 'express';
import { integrationControllers } from './integration.controller';



const router = Router();

router.get('/github/callback', integrationControllers.githubIntegration);
router.delete('/github/:id', integrationControllers.removeGithubIntegration);

export const integrationRoutes = router;