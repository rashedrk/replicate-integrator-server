import { Router } from 'express';
import { issueControllers } from './issue.controller';
import validateRequest from '../../middlewares/validateRequest';
import { IssueValidation } from './issue.validation';





const router = Router();

router.post(
    '/create',
    validateRequest(IssueValidation.issueValidationSchema),
    issueControllers.createGithubIssue
);
router.get('/:id/repo', issueControllers.getAccessibleRepoList);

export const issueRoutes = router;