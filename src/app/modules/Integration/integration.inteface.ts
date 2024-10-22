export type TIntegration = {
    integrationId: string;
    type: string;
    owner: string;
    appName: string;
    accessToken: string;
    refreshToken: string,
    expiresAt: Date,
}