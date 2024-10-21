import { Router } from 'express';
import { integrationControllers } from './integration.controller';



const router = Router();

router.get('/github/callback', integrationControllers.githubIntegration);

export const integrationRoutes = router;