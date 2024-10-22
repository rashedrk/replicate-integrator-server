import { z } from "zod";

const issueValidationSchema = z.object({
    body: z.object({
        title: z.string({ required_error: "title not provided" }),
        message: z.string({ required_error: "message not provided" }),
        repo: z.string({ required_error: "repository name not provided" }),
        integrationId: z.string({ required_error: "integration id not provided" }),
    })
});

export const IssueValidation = {
    issueValidationSchema
}