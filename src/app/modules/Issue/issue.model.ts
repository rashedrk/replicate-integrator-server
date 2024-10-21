import { Schema, model } from "mongoose";
import { TIssue } from "./issue.interface";


const issueSchema = new Schema<TIssue>({
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    repo: {
        type: String,
        required: true,
    },
    integrationId: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false
});


export const Issues = model<TIssue>('Issue', issueSchema);