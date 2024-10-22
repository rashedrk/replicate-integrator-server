import { issueServices } from "./issue.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { HttpStatusCode } from "axios";

const createGithubIssue = catchAsync(async (req, res) => {

    const payload = req.body;

    const result = await issueServices.addGithubIssue(payload);

    sendResponse(res, {
        statusCode: HttpStatusCode.Created,
        success: true,
        message: "Issue created successfully",
        data: result
    })
})


const getAccessibleRepoList = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await issueServices.getRepositories(Number(id))
    sendResponse(res, {
        statusCode: HttpStatusCode.Ok,
        success: true,
        message: "Repository retrieved successfully",
        data: result
    })

});

export const issueControllers = {
    createGithubIssue,
    getAccessibleRepoList
}