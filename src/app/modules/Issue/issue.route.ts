import { Router } from 'express';
import { issueControllers } from './issue.controller';





const router = Router();

router.post('/create', issueControllers.createGithubIssue);

export const issueRoutes = router;