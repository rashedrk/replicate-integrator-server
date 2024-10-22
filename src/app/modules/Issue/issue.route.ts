import { Router } from 'express';
import { issueControllers } from './issue.controller';





const router = Router();

router.post('/create', issueControllers.createGithubIssue);
router.get('/:id/repo', issueControllers.getAccessibleRepoList);

export const issueRoutes = router;