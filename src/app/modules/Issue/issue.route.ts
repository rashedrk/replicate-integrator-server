import { Router } from 'express';
import { issueControllers } from './issue.controller';




const router = Router();

router.get('/create', issueControllers.createGithubIssue);

export const issueRoutes = router;