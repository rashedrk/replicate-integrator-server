import { Schema, model } from "mongoose";
import { TIntegration } from "./integration.inteface";


const issueSchema = new Schema<TIntegration>({
    integrationId: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    appName: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    accessToken: String,
    refreshToken: String, 
    expiresAt: Date,
}, {
    timestamps: true,
    versionKey: false
});


export const Integration = model<TIntegration>('Integration', issueSchema);